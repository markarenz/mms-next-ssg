---
title: 'Re:hash - A Fully Functional Yet Useless Social Network'
datePublished: 2020-08-27
image: posts/37.jpeg
metaDescription: I just put a new project in beta, a social platform called Re:hash. It lets you cut up bits of classic lit and remix them into something unique, think magnetic poetry on "hard" mode.
---

I just put a new project in beta, a social platform called Re:hash. It lets you cut up bits of classic lit and remix them into something unique, think magnetic poetry on "hard" mode.

Re:hash is a spiritual successor to an earlier project called Swatchity, a social network where users could only post colors. You could message people, for example, but only with a color. You could upload photos from your phone, which would be averaged down to a varying shade of greenish beige. You get the idea.

## Why? Why Build This Abomination?

The idea of spending months making a highly functional application that is, at the same time, utterly useless is something I find profoundly amusing. Once I dove head-first into Node a few years ago, I knew I'd revisit it. I built a prototype MERN stack with little animations for each of the colors as they slid into place. I loved it. I hated it. I wanted to do something new.

A few months ago, I started playing around with the concept at the center of Swatchity: self-expression in the context of strict limitations. It's difficult, of course, but managing to communicate your idea within those limitations is one heck of a trick to pull off, a bit like haiku or coming up with a very clever vanity license plate.

Around that time, the idea of a social network based on magnetic poetry hit me. Not only magnetic poetry, but the building blocks are slices of classic (public domain) literature. So it feels a little illicit, like plagiarism. In fact, the original name for the app was Plagiarista, but my daughter didn't like the name. I'm still fond of it, but Re:hash seems to do the job without implying actual word theft.

Of course, it's not plagiarism really, since each post is festooned with citations, each linking back to the original work on the Gutenberg Project. Naturally, if someone happens to spend 5 minutes on Re:hash and finds an old Emma Lazarus poem they like and click through to read the rest, well, job done.

I liked the idea of creating a mock social network where rude, aggressive behavior was impossible- well, if not impossible at least it's very difficult. That's why all the other elements of the application (tags, slogans, even the contact form) are all based on mixing and matching a curated list of words and phrases. The contact form is particularly functional and useless. You can choose technical support or emotional support. It amuses me, and I can't apologize for that.

## Well, That's Certainly Colorful

I found a photo of an abandoned Lisa Frank factory while I was white-boarding this project, and something about the unapologetic chromatic excess appealed to me. It amused me almost as much as making a social platform where all you could do is post magnetic poetry.

I included lots of SVG animations and other touches to emphasize how silly the thing is. I made sure to include goofy messaging throughout to continue that thread. For example, when you like your own post you get a supportive notification encouraging you to embrace the importance of self-love.

There is a scoring system with levels, a bit like Swatchity. The more you use it, the more likes you get, the more you rise in the Re:hash hierarchy and the closer you get to the Ancient Order of the Prismatic Rhomboid.

## Nerdy Stuff

You know the drill: React on the front end and Nodejs/Express in the backend with GraphQL keeping the whole lovely layer cake together.

I decided to experiment with some different techniques and patterns with this one, meaning GraphQL hooks and some

The backend is hosted on Heroku for $7/month and the frontend is static ReactJS hosted for a buck or so per month on AWS.

I've hosted static React sites on AWS before, but since this one required an .env it soon became apparent that this would not do. Environment files do not work on AWS S3 bucket web hosting, but that turned out to be easily resolved. It turned out my .env was full of client IDs and secrets I wasn't even using, so I refactored to use a config file with variables that didn't require the secrecy of a true .env file.

On top of that, deploying to S3 is far easier than I'd imagined. In the past, I've simply pushed the files manually via the S3 web interface, which can lead (and has led) to errors large and small. Just add a script to your package.json - something like: "was s3 build/ s3.name_of_your_bucket" as long as you're logged into the aws cli. Just run your build command then deploy. It's so easy it feels wrong somehow.

Once you deploy to your serverless frontend, you'll need to think about cache-busting. AWS Cloudfront is fantastic and its cache can save your hide every day that ends in a "y," but when you want to bust that cache, you'll need to create an invalidation. You'll need to do it every time you push. The cache on CloudFront is strong like crazy glue. To check what it really looks like, you can navigate to the site via the S3 bucket hosting URL. Once you confirm everything looks OK, then create your invalidations. It's a bit like a poor-man's staging setup.

## Mix and Match

So, go [check it out if you want.](https://rehash.ridiculopathy.com) I'm not very good at promoting these things, and honestly it doesn't interest me all that much. In fact, I've made games in the past that cost me hundreds per month to operate, so ignoring it might be doing me a favor. I brought this stupid thing into being because it amused me to do so.
