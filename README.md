## MMS Next SSG

This is a remake of MarkMakesStuff using NextJS SSG and Typescript.

There have been at least four previous versions in various languages and frameworks.
This version should run very quickly and have the SEO advantage of pre-rendering so social media sharing should work better than it does with flat ReactJS. Additionally, this version greatly simplifies the content creation process without the need for a database or a CMS application separate from the frontend. See the content editing section below for more details.

## General Goals

- Use Markdown for content editing
- Accessibility testing baked in
- Next Image components are off the table with SSG, so we will have to build our own optimization scheme

## URL Structure

We want to make sure the existing project's URL structure is maintained as much as possible to preserve SEO.

As such, we will continue using /posts for the listing of posts and /posts/:slug as the URL for the post detail.

We will be using route-driven SSG pagination for this project, so we won't be able to use /posts/1 since that would interfere with the existing /posts/:slug pattern. If this was a new site, we would use /post:slug for post detail, but that does not seem like a solid option at this point. As a result, the post pagination will work like this: /posts will have 1-X posts (X being the max number of posts per page) and for X+1 and beyond, the URLs will look like this /posts/archive/1

For other page types with paginated lists, we will use a similar strategy.

## Content Editing

There are three content types in the application presently: Pages, Projects and Posts.

---

## Run Locally

Use `npm run dev` to run the project locally. No local untracked files such as .ENV files are necessary

## Building & deploying the Project

Use `npm run build` or `npm run build:deploy` to distribute the project. Change the npm script to point to an S3 bucket in your AWS account.

Additionally, your S3 bucket will need open permissions, a bucket policy to allow object access, and web hosting enabled from the properties menu in the AWS console.

Create an SSL cert for your domain, and use it in a CloudFront distribution that points to your S3 bucket. Use Route53 to connect your distribution to your domain. Be sure to provide A as well as AAAA records. Without the AAAA record, some devices that work best with IPV6, such as mobile devices, may not work properly.

## Projects and Posts

- Images for these content types should be 1920 x 700
- The image CDN will provide the thumbnail images on the fly
  - https://imagekit.io/login/
