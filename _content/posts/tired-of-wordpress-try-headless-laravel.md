---
title: Tired of Fretting Over WordPress? Time to Give Headless Laravel a Try
datePublished: 2019-03-30
image: posts/30.jpeg
metaDescription: I've made a half dozen Laravel projects in the last year or so, and it continues to impress me.  Powerful, secure, and orderly, I cannot get enough of it.
---

_Headless Laravel might sound like the future, but for me, it's the "right now." In fact, this very website is a headless Laravel project started a few months ago. The real work only took a couple of weekends. Find out more below..._

**I love WordPress.** I've been making WordPress sites for about 10 years, and for the most part, it's been really gratifying. This plucky little blog-engine-turned-CMS has come a long way. It's grown so popular that about a third of the visible Internet is running WordPress in one form or another. It's huge, and we as a community should feel very proud to have been a part of the "WordPress Movement."

The ecosystem is unrivaled, a vast expanse of helpful tools, plugins and themes. Now, of course, some of these free chunks of code are laughably broken or, worse, pesky info-sec time-bombs waiting for you to go on vacation before some bored Russian teenager rewrites every record in your database with One Direction lyrics.

Naturally, WordPress' wild popularity contributes significantly to one of its biggest problems: the target on its back. WordPress projects need more maintenance than most other CMS-driven sites. They require weekly or daily updates to keep the devil from your front door. And even when you do, you can run into a botched [Easy WP SMTP update](https://nakedsecurity.sophos.com/2019/03/25/update-now-wordpress-hackers-target-easy-wp-smtp-plugin/) that gives everyone and their brother full admin access.

_I'm not kidding. Read the link. It's crazy._

## At some point, I grew weary of it.

Of course, I'm happy to manage 40+ WordPress sites and deal with all the various headaches and near-infarctions on a daily basis, but for my own site I wanted something built on sturdier ground, something that isn't trying to be everything to everyone. Just the code I need to do the job, nothing extraneous.

I've made a half dozen Laravel projects in the last year or so, and it continues to impress me. Powerful, secure, and orderly, I cannot get enough of it. The file structure is so neat and clean. Marie Kondo would love it. It's a snap to pick up a project after a year or walk into someone else's Laravel project and know precisely where to go to affect a particular function. Compare that to the maze of plugins in your Wordpress sites or, worse, off-the-shelf themes with layers of abstraction that make simple edits painful.

So, it occurred to me while doing some initial planning for another security-focused project that I ought to consider building this as a headless Laravel site.

**On the backend:** a Laravel app for handling the content, uploading images and JSON files directly to the front-end server.

**On the front-end:** another Laravel app stripped down to the studs (no logins, no users, etc.) that reads the JSON files and paints the site based on that.

Why not use React for the front-end, you ask? A couple of reasons: 1) without Express, React out of the box can be bad for SEO from what I've read (this may not be true much longer, but it's an issue now) and 2) I like Laravel. It's fun (more fun than React in my experience), and if this project is for me, I'm going to have fun. That said, I'll probably rebuild it in React later on, just because I can.

## Headless Pet Peeves

The initial design/build phase was trickier than I had anticipated. I ended up building out the first few pages in raw HTML in the blade files, making sure the end result looked the way I wanted on various devices, then doubling back and creating block types. After that, it was fairly simple to create the pages easily in the page editor as intended.

Additionally, testing the front-end on my local machine was difficult since the back-end was pushing everything to a folder on the remote server, and I had to move the JSON files after every edit. Once I moved everything to the main server, edits became much easier. For the next headless project, we're pushing all the JSON and images to Amazon, so the process will be much easier.

## The Nerdy Stuff

At the core of the front-end app is a somewhat novel method for dynamic routing, using your routes/web.php to pull in specific endpoints and then using a catch-all controller function to check for a matching slug in the "pages" JSON file.

Each content block on the front-end has a block type (2 column text, contact form, bio block), similar to a page builder like WPBakery or Gutenberg. On the back-end, each block type has its own variables thanks to the flexible JSON in the content field. The page editor can flip back and forth between raw code and a visual editor, much like WordPress, but the raw code is JSON rather than raw HTML. The front-end interprets these variables at run time, pulling in blade files for each block type on the fly. The SCSS partials are organized by block type, making it trivial to make edits for each block type or create new ones. The result is very fast and very simple.

Security is the real star of an architecture like this. Unlike other decoupled models, the front-end site never references the back-end. Better still, the back-end app lives on my laptop running Vagrant. This method removes many of the most popular attack vectors and eliminates the need for constant updates.

Nothing on the web is 100% secure, of course. An attacker could brute force any one of a number of weak spots, but that's not the point. My goal was to make a site that 1) felt like the future of web development and 2) offered a bit of peace of mind. I think this has done that - at least for now.
