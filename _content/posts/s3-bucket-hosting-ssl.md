---
title: 'Saving Nearly $500 Every Year with Static React and AWS'
datePublished: 2019-12-23
image: posts/32.jpeg
metaDescription: After hosing sites on a pricey VPS for almost 20 years, I rebuilt many of them in React so I can host static files on an S3 bucket and save hundreds.
---

I started making websites with PHP and basic LAMP stacks in the spring of 2000. I built humor sites, games, web apps using PHP and Apache like nearly everyone else did at the dawn of the Internet. At the time, my hosting needs were minimal, but at the height of the Flash era I was making several new games every year and getting around 15,000 visitors per day with peaks near 100,000. To avoid severe bandwidth up-charges, I had to upgrade my VPS to the point where it now costs me around $40 per month. With taxes, that's close to $500 every year.

Now that most of my projects are Javascript, it seems like overkill to host them there. Moreover, the server is old enough that the hosting vendor has informed me that it cannot run the NodeJS projects I've been making. Something had to change.

I took a look at the landscape of projects I was hosting on my VPS and it broke down into four main sites and dozens of little experiments.

I've been slowly converting many of my PHP-driven projects to NodeJS on the back-end and React on the front-end. I didn't want to lose my old email addresses (or pay for email accounts I almost never use), so I set up an account on ImprovMX. This service will forward mail sent to that domain to your gmail.

**Swatchity**, a fake social media network based on posting colors, is being rebuilt entirely. For now, though, I put together a simple one-pager placeholder in React.

**Ridiculopathy**, repurposed as a repository for experiments and weird side projects, is a react front-end with subdomains and subdirectories for separate projects.

**MarkMakesStuff** (this site) is a PHP-driven Laravel backend, which only lives on my laptop, so I don't (or want) to host it on the web. The front-end used to be Laravel as well, but I recently rebuilt it in React.

**My son's Scouts BSA troop website** had been a WordPress site with a highly complex theme that helped manage everything from our calendar to troop rostering. Now that the national organization has offered a free tool for us to do most of that off-site, we no longer need that site. So, we're currently working on replacing it with a Node-driven Express back-end with a React front-end. The back-end pushes images and JSON directly to our AWS bucket. This headless architecture means that there's no need for real-time communication, so we can host it for free on Heroku. Each time we load it for the first time in a while, there's a 10-20 second delay, but that's perfectly fine given the use case, and the price is right.

As you can see, for all of these projects a full-blown VPS is overkill. Enter Amazon Web Services.

## How to Set Up S3 Hosting with SSL on AWS

At first, AWS can be quite intimidating. Their panoply of Cloud services is a little confusing, and the UI was certainly not designed for human consumption. In our case, we only have to set up a handful of services to make it all work:

- S3 buckets for storage
- Route 53 for DNS zone control
- Certificate Manager for SSL certificates
- CloudFront for creating and managing distributions that bind the certificate and S3 storage together

### 1. Be sure your domain is under your control and that any propagation is complete.

I moved the domain registration for some of these properties prior to this exercise, so I needed to wait a few days before diving into the fun stuff.

### 2. Set up your AWS account if you haven't already.

Be sure to set up multi-factor authentication (MFA) and IAM users.

### 3. Set up your buckets.

Assuming you want visitors to see `www.yourdomain.com` when they visit, you will need to set up 2 buckets for each domain: the primary domain and the www subdomain.

For my region, I used us-east-1 because it's closest, and I read that a few years back only that region was capable of using SSL. I'm fairly sure that's not the case anymore, but I did that just to be sure.

In S3, start a new bucket named exactly like the URL. In this example: one bucket named `yourdomain.com` and the other named `www.yourdomain.com.` In the initial setup, turn off any restrictions on public access.

In the Properties tab, set up bucket hosting for both. Set index.html as the URL for both the web root and any errors. This is critical for React sites. Also under Properties, you will want to turn on versioning. Otherwise, AWS's caching makes changes difficult to see.

There is a forwarding option for your primary domain bucket. In some circumstances, the bucket redirect won't work and you need to add an index.html file with a meta redirect.

Under Permissions, add a bucket policy like the one below to allow public access to the bucket.

```
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Sid": "PublicReadGetObject",
              "Effect": "Allow",
              "Principal": "*",
              "Action": "s3:GetObject",
              "Resource": "arn:aws:s3:::www.yourdomain.com/*"
          }
      ]
  }
```

Put a test index.html file in your bucket and test it. Note that the URL for the index file itself is for file hosting. For bucket web hosting the domain would look something like this: `http:www.yourdomain.com.s3-website-use-east-1.amazonaws.com`

Upload your content, and be sure to set the objects to public. When you upload, the default is not public, so just click on that dropdown and set the objects to public as you upload.

### 4. DNS Setup Part 1

In Route 53, click on Hosted Zones and start a new hosted zone. This will cost you $0.50 per month. You only need one per domain.

Copy the name servers that you will see in the record and edit your domain registration DNS to point to those name servers. Wait until the propagation is complete. This can take 36 hours but is often ready for your to use in an hour or so. You will need to flush DNS cache on your machine.

If you are running an email relay, add your MX records here and send test emails when propagation is complete.

### 5. Start a certificate

Assuming that the domain has propagated correctly, go to Certificate Manager and request a new public certificate, one per domain. You can create one for your primary domain and add the subdomain to it. For validation, use the email option since it's much easier. If you're using ImprovMX, make sure it's working before you do this. You can force the validation email to resend if needed.

NOTE: these are free Let's Encrypt certs that will auto-renew. You can see a note about auto-renew eligibility on the table of certificates.

### 6. Set Up CloudFront Distributions

In CloudFront, create a new distribution for each domain and www subdomain.

There are a lot of options, but these are the ones to edit:

- Origin: select the bucket appropriate to this domain
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Alternate Domain Names: enter the bucket name
- Certificate: pick the one you made for this domain

Be sure to add a custom error for 404. Set the object to "index.html" so your distribution knows to send all errors to index.html. Otherwise, when someone refreshes a page in your React app, they'll get an "access denied" error.

Wait. Distributions take a while to process on AWS. Changes you make later will also take time, usually a half hour.

### 7. DNS Setup Part 2

Return to Route 53 and set up aliases pointing to your CloudFront distributions. Be careful not to point them at your buckets because this will not work. Create an A record alias and AAAA record alias for each domain and subdomain.

Now test your project. Be sure to navigate into your project to some depth and refresh to make sure you're not seeing an "access denied" error. See the troubleshooting section below.

### Troubleshooting

A common problem is that you set it all up only to find that `yourdomain.com` resolves to an "access denied" error.

- Make sure the bucket hosting works (see above).
- Make sure the bucket hosting has a root and error object set to "index.html"
- Make sure the distribution also has the root and error objects set to "index.html"
  It works on http but not https
- This happens if you only used A records and not AAAA as well. You need both.
- To fix this, simply add the appropriate records in your Route 53 hosted zone.

You may find that it works on mobile networks but not on your office or home network. This can be due to IPv6 vs. IPv4 issues. Again, you need both A and AAAA records for the domain to work properly in AWS.

### Conclusion

That's all there is to it. It can take time to set up since there are several propagation steps involved, but once you do it once or twice, you'll find that AWS S3 bucket hosting is a great way to save money while integrating cloud services into your operations.
