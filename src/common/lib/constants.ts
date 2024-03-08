import { ContentRoute } from '@/common/interfaces/app';

export const postsPerPage = 3;

export const CONTENT_TYPES = {
  POSTS: 'posts',
  PAGES: 'pages',
};

export const CONTENT_DEFAULTS = {
  TITLE: 'Mark Arenz - Mark Makes Stuff',
  IMAGE: '/mms-default.jpg',
  DATE_PUBLISHED: '2024-01-01',
  DESCRIPTION:
    'Mark Arenz, an experienced software engineer crafting digital experiences for users in a variety of industries.',
};

export const CONTENT_ROUTES: { [key: string]: ContentRoute } = {
  posts: {
    baseRoute: '/posts/',
    archiveRoute: '/posts/archive/',
  },
};

export const cmsSectionDefinitions = {
  'twitter-feed': [],
  'cta-1': ['headline', 'subhead', 'photo', 'buttonLabel', 'buttonLink'],
  'posts-list': ['headline', 'numitems', 'buttonLabel', 'buttonLink'],
  'projects-list': ['headline', 'numitems', 'buttonLabel', 'buttonLink'],
  'orange-icons': [],
  'page-header': ['headline', 'subhead', 'photo'],
  'page-header-orange': ['headline', 'subhead', 'photo'],
  '1-col-dark': ['html'], // rename this, use Markdown
  '1-col': ['align', 'html'], // rename this, use Markdown
  '2-col': ['align', 'html1', 'html2'], // do we need 2 text areas or 1 with 2 col css?
  '2-col-pic-left': ['align', 'photo', 'html1'], // rename this, use Markdown
};

export const tempPages = [
  {
    id: 1,
    title: 'Mark Makes Stuff',
    slug: 'mms-home',
    content:
      '[{"type":"page-header-orange","id":"page-header-orange","title":"Page Header","class":"","headline":"Mark Arenz","subhead":"An experienced developer and media professional in Indianapolis Indiana, crafting websites, apps, and video content since 1992.","photo":"mms-page-headers-01.jpg"},{"type":"orange-icons","id":"orange-icons","title":"Orange Icon Block","class":"tst"},{"type":"posts-list","id":"recent-posts","title":"Blog Posts","class":"","numitems":"6"},{"type":"1-col-dark","id":"text-1","title":"Text 1","class":"","html":"<h2 class=\\"anim-me anim-from-right\\" id=\\"col-1-dark-h2\\">The Know-How You Need, Experience to Lead</h2>\n<h3 class=\\"anim-me anim-from-left trans-delay-0-25\\" id=\\"col-1-dark-h3\\">Motivated creative and technical teams can move mountains.</h3>"},{"type":"projects-list","id":"recent-projects","title":"Projects","class":"","numitems":"6"},{"type":"twitter-feed","id":"twitter-feed","title":"Twitter","class":""},{"type":"cta-1","id":"cta-1","title":"CTA","class":"","headline":"An array of experience both broad and deep","subhead":"ReactJS, Node, NextJS, PHP, marketing and managing are just a few of the skills you\'ll find in my resume.","photo":"cta-bg.jpg","buttonLabel":"Resume","buttonLink":"https://www.markmakesstuff.com/Mark-Arenz-Resume.pdf"}]',
    status: 1,
    metadesc:
      'Mark Arenz is an experienced web and app developer in Indianapolis Indiana, crafting sites, apps, and video industry since 1992.',
    created_at: null,
    updated_at: '2023-05-07 22:19:06',
  },
  {
    id: 2,
    title: 'Blog',
    slug: 'blog',
    content:
      '[{"type":"page-header","id":"page-header","title":"Page Header","class":"","headline":"Blog","subhead":"","photo":"mms-page-headers-02.jpg"},{"type":"posts-list","id":"posts-list","title":"Posts Full","class":"tst","numitems":"0"},{"type":"cta-1","id":"cta-1","title":"CTA","class":"","headline":"It\'s time to think outside your CMS.","subhead":"When it comes to making great stuff for the web, you have a lot of options. Let\'s talk about React, Express or highly secure headless options. Been there. Done that.","photo":"cta-bg.jpg","buttonLabel":"Learn More","buttonLink":"/work"}]',
    status: 1,
    metadesc:
      'Check here often for updates on the latest projects and articles related to WordPress, Laravel, and other industry news.',
    created_at: '2019-03-02 23:52:10',
    updated_at: '2019-12-21 18:50:49',
  },
  {
    id: 3,
    title: 'Work',
    slug: 'work',
    content:
      '[{"type":"page-header-orange","id":"","title":"","class":"","headline":"Work","subhead":"React, NextJS, Laravel, iOS, Video","photo":"mms-page-headers-03.jpg"},{"type":"projects-list","id":"projects-list","title":"Projects Full","class":"tst","numitems":"0"},{"type":"cta-1","id":"cta-1","title":"CTA 1","class":"","headline":"Don\'t Miss Out","subhead":"Keep up to date with the latest project updates and industry news.","photo":"cta-bg.jpg","buttonLabel":"Learn More","buttonLink":"/blog"}]',
    status: 1,
    metadesc:
      "Whether it's WordPress, Laravel, headless development - Mark has been there. Check here for a list of recent projects.",
    created_at: '2019-03-02 23:54:58',
    updated_at: '2023-05-07 21:36:52',
  },
  {
    id: 4,
    title: 'Bio',
    slug: 'bio',
    content:
      '[{"type":"page-header","id":"page-header","title":"Page Header","class":"","headline":"Bio","subhead":"From video to web development and beyond","photo":"mms-page-headers-bio.jpg"},{"type":"1-col","id":"","title":"Resume","class":"","align":"center","html":"<a href=\\"/Mark-Arenz-Resume.pdf\\" target=\\"_blank\\" class=\\"btn btn-primary\\">Download Resume</a>"},{"type":"2-col","id":"","title":"TRS-80","class":"py-4","align":"left","html1":"<div class=\\"text-large font-headline\\"><i>For me, the technology revolution began in 1982 when my dad brought home a shiny new TRS-80.</i></div>  ","html2":"It had 2 colors, black and white, 16 whole kilobytes of memory, and a programming language built right into the nascent operating system.  BASIC, far from the Instagram insult it is today, was a simple iterative language that introduced people to the joys of making things with logic.  This gawkish hunk of plastic became a gateway to a landscape of limitless possibility.  If it weren\u2019t for Boy Scouts, I\u2019d never have left the house."},{"type":"1-col-dark","id":"","title":"Basic","class":"code","html":"<div class=\\"container-narrow text-large text-left\\">10 print \u201cHowdy. This is a loop.\u201d<br />20 goto 10</div>"},{"type":"2-col","id":"section-2","title":"BOC","class":"py-4","align":"left","html1":"<br />\nIn my teens, I finagled my way onto a local by-kids-for-kids television show called Beyond Our Control, a Junior Achievement project. The experience sparked a love of video production, and I spent my college years and a further two decades studying and practicing the fine and fiddly arts of post production.","html2":"<img src=\\"https://www.markmakesstuff.com/remote/images/boc_1985.png\\" class=\\"responsive\\" alt=\\"Beyond Our Control\\"/>\n"},{"type":"1-col","id":"section-3","title":"VID PROJECTS","class":"py-4 ","align":"left","html":"<div class=\\"row\\">\n\t<div class=\\"col-md-4 project-cell project-cell-mini\\">\n\t\t<div class=\\"inner\\">\n\t\t\t<a href=\\"/projects/itpc-breathe-easy-tv\\">\n\t\t\t  <div class=\\"bg-wrap\\">\n\t\t\t\t<div class=\\"bg\\" style=\\"background-image:url(https://www.markmakesstuff.com/remote/images/projects/thumb--26.jpeg);\\"></div>\n\t\t\t  </div>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\t<div class=\\"col-md-4 project-cell project-cell-mini\\">\n\t\t<div class=\\"inner\\">\n\t\t\t<a href=\\"/projects/westview-healthplex-tv\\">\n\t\t\t  <div class=\\"bg-wrap\\">\n\t\t\t\t<div class=\\"bg\\" style=\\"background-image:url(https://www.markmakesstuff.com/remote/images/projects/thumb--24.jpeg);\\"></div>\n\t\t\t  </div>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\t<div class=\\"col-md-4 project-cell project-cell-mini\\">\n\t\t<div class=\\"inner\\">\n\t\t\t<a href=\\"/projects/inspiration-design-center-kitchen-sale\\">\n\t\t\t  <div class=\\"bg-wrap\\">\n\t\t\t\t<div class=\\"bg\\" style=\\"background-image:url(https://www.markmakesstuff.com/remote/images/projects/thumb--36.jpeg);\\"></div>\n\t\t\t  </div>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n</div>\n\n"},{"type":"2-col","id":"","title":"FLASH","class":"py-4","align":"left","html1":"Remember Flash? I sure do. Before the advent of pocket computers, Flash was just about the most fun toy any overgrown kid could ask for. Branching out from multimedia work for clients, I began making games and managed to sell a few of them to sites like Miniclip. \n","html2":"I put together a site just to house them, and a few years later I had a library of around 30 games. \n\nCheck out the <a href=\\"/arcade-archive\\">Arcade Archive</a> to play through some of the classics."},{"type":"1-col","id":"","title":"iOS v2","class":"py-4","align":"left","html":"<div class=\\"row\\">\n\t<div class=\\"col-md-4\\">\n\t\t<span class=\\"text-large font-headline\\"><i>Admittedly, I was a late adopter of smartphones, only deigning to buy one when I got my hands on the iOS SDK.</i></span> I immediately dove into the intricacies of Objective C and XCode, producing app after app for clients around the country and a few just for fun.\n\t</div>\n\t<div class=\\"col-md-8\\">\n\t\t<div class=\\"row\\">\n\t\t\t<div class=\\"col-md-6 project-cell project-cell-mini\\">\n\t\t\t\t<div class=\\"inner\\">\n\t\t\t\t\t<a href=\\"/projects/highlights-hidden-pictures-app\\">\n\t\t\t\t\t  <div class=\\"bg-wrap\\">\n\t\t\t\t\t\t<div class=\\"bg\\" style=\\"background-image:url(https://www.markmakesstuff.com/remote/images/projects/thumb--29.jpeg);\\"></div>\n\t\t\t\t\t  </div>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\\"col-md-6 project-cell project-cell-mini\\">\n\t\t\t\t<div class=\\"inner\\">\n\t\t\t\t\t<a href=\\"/projects/fliponium-ios-game\\">\n\t\t\t\t\t  <div class=\\"bg-wrap\\">\n\t\t\t\t\t\t<div class=\\"bg\\" style=\\"background-image:url(https://www.markmakesstuff.com/remote/images/projects/thumb--11.jpeg);\\"></div>\n\t\t\t\t\t  </div>\n\t\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n\n"},{"type":"1-col","id":"","title":"WordPress","class":"py-4","align":"left","html":"<hr class=\\"orange-dashed\\"/><div class=\\"container-narrow\\">In early 2009, a client asked me to build a simple custom WordPress theme. Resisting the urge to ask for a definition of every word in that sentence, I poured myself into the task and produced the thing on time and on budget. \n\nSince then, I\u2019ve built dozens of highly customized WordPress sites, including a batch of 22 ported from Expression Engine in just a few months. </div><hr class=\\"orange-dashed\\"/>\n<div class=\\"row\\">\n\t<div class=\\"col-md-4 project-cell project-cell-mini\\">\n\t\t<div class=\\"inner\\">\n\t\t\t<a href=\\"/projects/coachmajor-com\\">\n\t\t\t  <div class=\\"bg-wrap\\">\n\t\t\t\t<div class=\\"bg\\" style=\\"background-image:url(https://www.markmakesstuff.com/remote/images/projects/thumb--41.jpeg);\\"></div>\n\t\t\t  </div>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\t<div class=\\"col-md-4 project-cell project-cell-mini\\">\n\t\t<div class=\\"inner\\">\n\t\t\t<a href=\\"/projects/humane-society-indianapolis\\">\n\t\t\t  <div class=\\"bg-wrap\\">\n\t\t\t\t<div class=\\"bg\\" style=\\"background-image:url(https://www.markmakesstuff.com/remote/images/projects/thumb--40.jpeg);\\"></div>\n\t\t\t  </div>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\t<div class=\\"col-md-4 project-cell project-cell-mini\\">\n\t\t<div class=\\"inner\\">\n\t\t\t<a href=\\"/projects/wrench-group-website\\">\n\t\t\t  <div class=\\"bg-wrap\\">\n\t\t\t\t<div class=\\"bg\\" style=\\"background-image:url(https://www.markmakesstuff.com/remote/images/projects/thumb--37.jpeg);\\"></div>\n\t\t\t  </div>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n</div>"},{"type":"1-col","id":"","title":"Web Apps","class":"","align":"left","html":"<div class=\\"row\\">\n<div class=\\"col-md-8\\">\n<span class=\\"text-large font-headline\\"><i>Websites are fun, but highly customized web applications are an entirely new level of fun.</i></span>\n\nA few years later, I was knee deep on PHP MVC frameworks such as Laravel, building web apps for an array of clients.\n</div>\n<div class=\\"col-md-4\\">\n<div class=\\"row\\">\n\t<div class=\\"col-md-12 project-cell project-cell-mini\\">\n\t\t<div class=\\"inner\\">\n\t\t\t<a href=\\"/projects/invoicing-tool\\">\n\t\t\t  <div class=\\"bg-wrap\\">\n\t\t\t\t<div class=\\"bg\\" style=\\"background-image:url(https://www.markmakesstuff.com/remote/images/projects/thumb--42.jpeg);\\"></div>\n\t\t\t  </div>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n</div>\n</div>\n</div>"},{"type":"1-col","id":"","title":"Scouting","class":"py-4","align":"left","html":"<hr class=\\"orange-dashed\\"/><div class=\\"container-narrow\\">\nI\u2019ve lived in central Indiana with my wife and two children since graduating from DePauw University in 1992. An Eagle Scout from way back, I happily jumped into the adult leader role when my son Will joined Troop 446 in 2013, serving as Scoutmaster for 3 years and accompanying the troop\u2019s high adventure group on a trek to Northern Tier at the Boundary Waters in 2017. \n\nIt was a huge thrill and a tremendous relief when Will earned his Eagle rank in late 2018, joining three generations of Eagles in our family.\n</div><hr class=\\"orange-dashed\\"/>\n\n"},{"type":"cta-1","id":"cta-1","title":"CTA 1","class":"mt-5","headline":"Project Portfolio","subhead":"Sometimes it\'s fun to show off a little.","photo":"cta-bg.jpg","buttonLabel":"See More","buttonLink":"/work"}]',
    status: 1,
    metadesc: 'Test',
    created_at: '2019-03-04 03:54:49',
    updated_at: '2019-12-21 19:34:53',
  },
  {
    id: 5,
    title: 'Thank You',
    slug: 'contact-thank-you',
    content:
      '[{"type":"page-header","id":"page-header","title":"Page Header","class":"","headline":"Thank you.","subhead":"","photo":"mms-page-headers-bio.jpg"},{"type":"1-col","id":"","title":"Thanks","class":"py-5","align":"left","html":"<h2>Thank you for getting in touch with Mark Makes Stuff. Someone should be in touch with you shortly.</h2>\n<br />\n&nbsp;\n<br />"}]',
    status: 1,
    metadesc:
      'Thank you for getting in touch with Mark Makes Stuff. Someone should be in touch with you shortly.',
    created_at: '2019-03-07 02:23:11',
    updated_at: '2019-03-07 02:29:11',
  },
];

export const imageCdnBaseUrl = 'https://ik.imagekit.io/cfoxkhvjb/';
