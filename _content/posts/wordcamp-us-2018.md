---
title: WordPress US Conference - Nashville 2018
datePublished: 2018-12-07
image: posts/29.jpeg
metaDescription: NASHVILLE, TV - To no one's surprise, the big topic for session talks and hallway conversations at this year's WordCamp US conference is WordPress 5.0, which a...
---

NASHVILLE, TN - To no one's surprise, the big topic for session talks and hallway conversations at this year's WordCamp US conference is WordPress 5.0, which went live the day prior to the conference. The new page editor Gutenberg has been coming for several years, so most developers are generally up to speed on the shift this new model represents for the WordPress ecosystem.

## The Shiny Future of WordPress is Gutenberg

The new editor focuses on content blocks, and creating customized blocks for specific sites and brands is the must-have skill for developers here. Thankfully, there are two methods- the new way using React-like components and the PHP way using the as-yet unreleased beta of Advanced Custom Fields.

Using the command line interface, scaffolding new blocks using ES6 is very easy- though it appears broken in the 5.0 release candidate. I'm looking forward to using this tool once it's up and running.

I've done some tests in both these methods and the ACF version is dead easy, using many of the tried and true code blocks like custom get_posts arguments. Converting shortcode workhorses to Gutenberg blocks will be less of a hassle than many people imagined. It almost feels like cheating.

There has been a fair bit of grumbling that 5.0 was rushed out to coincide with the conference, and many of us will wait a week or so until 5.0.x comes out. Beyond that, it could be some time before we will be building sites with the new page editor. It will take time to build our custom block library and find a stable of trusted plugins for blocks. It may also be some time before Gutenberg is as powerful as other page editors such as WPBakery, which, incidentally, still works beautifully in 5.0.

## WordPress App

The WordPress mobile app is something I've not really thought too much about, though it's been around for about a decade now. It's not completely necessary since WPAdmin runs just fine on mobile devices, though the app is a bit faster and has the benefit of autocorrect for sloppy typists like myself. Its also handy for sites you don't visit often since it allows you to manage multiple sites and log in only once. All in all, it's a fairly handy tool for making edits on the road. In fact, this very post is being written and published using the tool.

## Haven't Heard of CSPs? You Will By 2020

We have been working for a while to keep our sites safe from client side attacks, but more recently attackers have begun to focus on the client side. If a script your site is pulling in from a vendor is compromised, you may have no idea. Rather than attacking single websites, hackers are targeting services that could compromise thousands of sites in one fell swoop.

An attack technique known as Magecart is wreaking havoc on large scale e-commerce platforms. At the current time, the group behind this attack is unknown, but there are some key techniques to mitigate this.

The first is to only run plugins from devs you trust and continue to recheck the trustworthiness of these developers over time. Plugins like WordFence are helpful for this.

The second one is trickier and far more interesting: Content Security Policies or CSPs. These are directives that tell the browser to only trust the content sources you list.

CSPs can be set in the meta tags or in the htaccess file, but the preferred method is to send it with the php/http headers.

The idea is a relatively new one, so new, in fact, that the directives that worked a year ago will probably break your site today. Also, the plugins for WordPress that help manage CSPs for linked and online JavaScript are shaky or out of date. I'm hoping WordFence will support CSPs by this time next year.

## Other WordPress-ish Stuff

One of the more fun talks of the conference was about algorithmic CSS. This wasn't about new methods or languages (SCSS and partials work very nicely, thanks) but a new way of thinking about how we use and organize CSS. If we build our CSS for sites in an algorithmic way, we separate responsibilities the way we would for an iterative language and modularize the project that makes it easy to reuse (cannibalize) later on. Also, we should probably learn to ditch IE9 and embrace flex once and for all. For anyone who works with corporate intranet, this may not be possible, however.

Other talks of note:

- Using Git Bisect to quickly track down bugs in old commits
- Project management for development teams, asking the right questions
- Migrating away from meta box dependency

## Meet me in St. Louis

The future for WordPress looks bright, especially from the developer community standpoint. Every dev I've spoken with is optimistic about (eventually) integrating Gutenberg and digging into content block development. Much has been made, and rightly so, about the robust nature of the WordPress ecosystem due to the careful planning of the WP Core dev team, but it's clear that the real strength of WordPress, and the real reason clients love it, is the community of developers who build sites with it. Without this group of dedicated people building and sharing their experiences, even the best FOSS CMS could not thrive.

See you all next year in St. Louis!
