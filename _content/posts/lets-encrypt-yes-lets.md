---
title: Let's Encrypt? Yes, Let's!
datePublished: 2018-03-09
image: posts/26.jpeg
metaDescription: Between search ranking drops and those bothersome "not secure" warnings, Google is doing all it can to exert pressure on sites to upgrade to SSL. That presents...
---

Between search ranking drops and those bothersome "not secure" warnings, Google is doing all it can to exert pressure on sites to upgrade to SSL. That presents a problem for most business owners since SSL's can be expensive, tricky to install for novices, and worst of all, you've got to do it all again in a year or two when the bloody thing expires.

Thankfully, that's no longer the case.

A few years ago, Let's Encrypt came on the scene and forever changed how we instantiate and manage SSL certs. That sounds a bit hyperbolic, but bear with me here. Let's Encrypt is amazing. In fact, if you manage and develop a fair number of websites on your server and your host doesn't support Let's Encrypt, you might consider switching. Let's Encrypt allows you to set up and install SSL certs in a single click. What's more they automatically renew and, amazingly, it's all free.

Honestly, if you're stuck with a host that doesn't have Let's Encrypt support, you can use CertBot along with Let's Encrypt on your server as long as you have root access. Still, I'd opt for the native support because even if you're SSH adept, there's something to be said for a single-click install and a good night's sleep.

Here's a simple step-by-step walkthrough on upgrading your WordPress site to SSL:

1. Use your host's one-button Let's Encrypt function to add your SSL. Be sure to include your www subdomain as well.
1. Download Better Search Replace
1. Navigate to Tools > Better Search Replace
1. Set your search and replace strings
   - Here's an example:
   - Search: http://www.domain.com<br />
   - Replace: https://www.domain.com<br />
   - NOTE: be sure to check your search & replace strings carefully.<br />This is why the system has a dry run feature in the first place.
1. Select all the available tables in your database.
1. Check the option to include GUIDs as well.
1. Do a dry run (keep the dry run checkbox checked for now).
1. If everything seems good, uncheck the dry run checkbox and let 'er rip!
1. Do another dry run to see if there are stragglers that didn't get updated last time. Sounds odd, but it happens!
1. Search your theme or child theme's source code for specific references to your old http:// domain or, just as likely, a CSS include for Google Fonts that isn't https.
1. Test the site in a browser with a decent developer toolset. You'll probably see the green lock turn back into "Not Secure." This is OK. Right click & inspect. Check the console, and you'll see specific references to http:// includes and where to find them.
1. Check the other pages to be sure before declaring victory.
1. All done? Yes! Now, deactivate and remove that Better Search Replace plugin because it's cleaner.

Let's wrap up. Let's Encrypt definitely looks like the way to go as long as you have a host with native support or root access.

_Say goodbye to paying through the nose and going through all that hassle when you can have it for free in all its auto-renewing glory._
