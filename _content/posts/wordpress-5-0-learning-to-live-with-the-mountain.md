---
title: 'WordPress 5.0: Learning to Live with the Mountain'
datePublished: 2018-08-10
image: posts/28.jpeg
metaDescription: Several decades ago when I was a lad of 15, I backpacked with 10 fellow Scouts along the trails at Philmont Scout Reservation. One day we found ourselves at a...
---

Several decades ago when I was a lad of 15, I backpacked with 10 fellow Scouts along the trails at Philmont Scout Reservation. One day we found ourselves at a mining operation, and our guide gave a talk about mountain men, a breed of highly self-sufficient trappers, traders, and miners who thrived in very harsh environments. The main thrust of the talk is something that's stuck with me ever since. In any situation, a mountain man has two choices: to live with the mountain or to live against it.

"Living 'against' the mountain is possible," he said (paraphrasing, of course, because it was 1985). "You can expend enormous effort to recreate some of the life you had before in a remote spot with limited resources. But eventually, if you survive a winter or two, you'll end up living with the mountain. You'll learn to work the mountain's way, eat the mountain's way, travel and everything else - all the mountain's way. The mountain's not going to change. You'll have to."

At the WordCamp conference in Cincinnati last fall, I got the same feeling. Folks I talked to spoke about "the WordPress way." For example, stuffing the database with custom tables that don't get removed when the theme or plugin go away- not a great idea. And building themes with customizers that don't interact with the WordPress Appearance Customizer panel- probably not OK. It made a lot of sense. And soon, it could be a means of survival.

As a developer, one of the best things about WordPress is that you can do anything in a variety of ways. As a developer coming in to fix an existing site, one of the worst things about WordPress is that folks can do anything in a variety of ways.

## That looks like it's about to change, which is a good thing.

Near the end of the conference schedule was a hotly-anticipated demo of Gutenberg, WordPress' new page builder. At the time I found it interesting and somewhat encouraging. There was a lot to like here, but it felt half finished. For one thing, it didn't do columns. Most of the reason people use Bootstrap-fueled page builders like Visual Composer is for columns. Who do they think they're fooling?

The WordPress representative did his best to answer our questions, but the underlying point had been made: 5.0 is coming, and it's brining Gutenberg with it. Moreover, it's pushing out Classic Editor as well.

OK. It's not as bad as it sounds. The questions most developers have break down into two categories:

- _What should I do with my legacy WordPress sites?_
- _How should I develop sites after WordPress 5.0 comes out?_

## Legacy Sites

### Update.

Keep your sites up to date. WordPress 5.0 is probably not going to break your site if it's currently running fine on the latest core. If you've refrained from updating thinking that 4.9.x is going to break something, you probably shouldn't be surprised when 5.0 breaks things.

**Plugin.** If you miss the Classic Editor, you'll be able to access it via a plugin.

**Page Builders.** The Classic Editor will probably be the key to backward compatibility for third party page builders like Visual Composer.

**Shortcodes.** Short-codes will also continue to be supported, though they may require the Classic Editor.

**Staging.** Set up a dev or staging version of the site and test 5.0 when it comes out. If your hosting situation makes that difficult, you can always run the site on your local machine with MAMP or WAMP. Tutorials abound.

## New Sites

**Don't Panic.** WordPress still runs 30% of the visible Internet. The ecosystem for themes & plugins is still quite strong. There's no reason to jump ship. For example, Craft is nice but it has its own problems. And if you want to talk about compatibility issues, look up issues folks have had updating from Craft 2 to Craft 3. Get a copy of any Douglas Adams book and tape it to your forehead. Everything is going to be fine.

**Gutenberg DIY.** Build a new custom theme centered around Gutenberg. Build out infrastructure for updating your theme across your client sites as you learn more & improve the theme.

**Blocks.** Instead of building a custom short-code for everything, do it the WordPress way and build out custom content blocks for Gutenberg. A bit of a learning curve, but by no means the end of the world. Then, if short-codes ever do really go away, you'll be safe.

By doing things a little more in the "WordPress way," you'll find a way to survive and thrive in WordPress 5.0 and learn to live with the mountain.
