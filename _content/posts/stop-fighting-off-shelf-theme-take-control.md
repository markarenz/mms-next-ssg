---
title: Stop Fighting Your Off-The-Shelf Theme and Take Control
datePublished: 2018-01-31
image: posts/24.jpeg
metaDescription: We've come full circle. In the early days of Wordpress development, the only way to get a decent looking site was to homebrew your own theme from scratch. This...
---

We've come full circle. In the early days of Wordpress development, the only way to get a decent looking site was to homebrew your own theme from scratch. This was an incredibly satisfying experience, but since it took far longer than clients expected, not a very profitable business decision. Each new site required a new from-scratch theme, and suddenly WordPress development made less financial sense.

A mentor I worked with years ago made me promise to stop "reinventing the wheel."

"But reinventing the wheel is fun," I said. "And it's a wheel I understand and can control."

I got over it. We all did. Along came sites like Themeforest, where new looks could be had for $50 a pop. You could set up a fairly good looking site fairly quickly. Good news for freelancers and non-coders who are only too happy to avoid CSS/SASS and instead use the theme's UI to set colors & header images. Not so great news for pros who want to fully customize that new theme.

Therein lies the rub: an off-the-shelf theme, for all its out-of-the-box glory, is only an 80% solution at best. To suit the design and customize the user experience wrapped around the client's brand and business model, you need to build out a child theme. This process is sometimes a breeze with theme devs like Elated, but for others (whom I will not name) the process is obtuse and unnecessarily time consuming. Working on a site last fall, for example, I heard directly from one theme dev that their theme was never built to be child-themed. In essence, the theme is an as-is proposition. This was not disclosed on the dev's site or by the re-seller, so you often cannot know if the theme is any good until you buy it. And if you're a pro, you know to never buy any stock asset until you get client approval, all of which means you can't find out that the theme is no good until it's kinda-sorta too late.

Even if the theme is perfect, the inconsistent UIs between themes requires you to document how changes are made. The question "is this controlled by the code or is it exposed in the theme's admin UI?" runs through your brain continually. For example, you think single.php handles the blog template, but it's tucked away in the theme's framework folder... and all of this is costing you most of the hours you thought you'd saved by going with a commercial theme.

While it's true that Gutenberg may save us all (another topic for another day), we need a solution for today. Right now.

What you need to do is build yourself an in-house theme. Include only what you need and peel away anything you don't- the stuff that slows down the site and slows down development. Pull in the content you always seem to need (fontawesome, for example) and features you always seem to throw into your functions.php (classes on widgets and control panel for GA & GTM).

My team started with a common plugin so we could spread these goodies to existing sites if we chose to. The functions included a customized login screen and a means of automating ALT tags for the media tool. We auditioned several base theme frameworks and decided on Underscores primarily because it came with so little cruft that we would have to sweep away.

We then built out a base theme with Bootstrap and some basic javascript elements that we always use. We also built a basic child theme that we use for the specifics. The customization panel is very spare, and this is on purpose. Nearly all the CSS, structural and otherwise, is handled through our SCSS \_partials. Full control. We drastically reduced the amount of redundant CSS (no more fighting the base theme's CSS) and the use of !important is almost unheard of.

So far we've used the MBC Alpha theme on 3 sites, all of which have their own unique look & feel. The same goes for functionality. The CI-RDA site uses custom post types to manage meetings, agendas, and minutes with specialized code for sorting through customized taxonomies.

You're not limited to the off-the-shelf themes you're seeing on Themeforest. You don't have to hassle with the inconsistencies or the spotty support. As a coder, you have the power. Use it.
