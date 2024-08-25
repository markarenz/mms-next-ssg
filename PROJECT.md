# MMS NEXT SSG PROJECT

## [x] MMSNS-1 Project Setup & SSG Basics

- Branch: feat/mmsns-1-project-setup-ssg-basics
- User Story
  - As a user, I should be able to see _unstyled_ pages and temp routing.
  - I should be able to see _unstyled_ dummy posts coming from the content directory that display properly with Markdown content on post details. The posts should be displayed with links and pagination should be based on the route.
  - If I deep link to a blog post or refresh on a non-homepage page, I should see that page's content and not the homepage content.
- ACs
  - [x] Project setup, no styling yet
  - [x] Read local Markdown files loading and displaying properly
  - [x] Read Markdown front matter
  - [x] Set up common Markdown content component and markdown-specific styling
  - [x] Common component for post excerpt & link
  - [x] Eslint config
  - [x] Create very simple blog setup with deep linking
  - [x] Test deploy SSG to S3 to confirm deep linking works
  - [x] Tests

---

## [x] MMS-2 Common Pagination

- Branch: feat/mmsns-2-common-pagination
- User Story
  As a user, I should have a common pagination experience that leads me around a list of posts or other data types. If we are on page 1 of the archives (/posts/archive/1), for example, the "previous" button should lead us to the main posts page (/posts).
- ACs
  - [x] Reusable Pagination component that can be used for posts or any other type of iterable page/data
  - [x] Handle going to and from the base page and archives.
  - [x] Add icons for previous and next from SVG components
  - [x] Update/add tests

---

## [x] MMS-3 CMS Page Structure Basics

- Branch: feat/mmsns-3-page-structure-basics
- User Story
  As a content editor, I should be able to add Markdown files in a specific structure with associated front-matter data to create pages on the site, using an image CDN.
- ACs
  - [x] Set up image CDN
  - [x] Set up dynamic routing and SSG slug iteration
  - [x] Create format and type for pages sections
  - [x] Create basic structure for some initial sections
  - [x] Create common image component to handle image CDN URL construction and lazy
  - [x] Generate SEO function for Metadata
  - [x] Test in S3 and check social sharing to make sure this works
  - [x] Update/add tests

---

## [x] MMS-4 Header & Footer

- Branch: feat/mmsns-4-header-footer
- User Story: As a user, I should be able to see the navigation and footer for every page. As a content editor, I should be able to swap out the header depending on the page.
- [x] Build out global nav
- [x] Add a header & footer slot to the CMS page structure to make it easy to swap them out
- [x] Build a homepage header (content block: page-header)
- [x] Build a footer
- [x] Update/add tests

---

## [x] MMS-5 Content Blocks: One Column Text

- Branch: feat/mmsns-5-content-one-col
- User Story: As a user, I should see the one column content block with content coming from the CMS
- ACs
  - [x] Build out one-col content block type with a variant for "light" and "dark" and create content as needed
  - [x] Update/add tests

---

## [x] MMS-6 Content Blocks: CTA

- Branch: feat/mmsns-6-content-blocks-cta
- User Story: As a user, I should see the primary CTA with content coming from the CMS for various elements
- ACs
  - [x] Build out cta-1 content block type and create content as needed
  - [x] Refactor breakpoints so we can have media queries within mixins
  - [x] Refactor CmsImage to handle being a standard image or a background image with focalPoint (background position)
  - [x] Update/add tests

---

## [x] MMS-7 Content Blocks: Skill Icons

- Branch: feat/mmsns-7-content-blocks-skill-icons
- User Story: As a user, I should see the skill section on the homepage with icons for various skills.
- ACs
  - [x] Create new skill icons
  - [x] Build out skill-icons content block
  - [x] Use CMS to determine order of icons
  - [x] Update/add tests

---

## [x] MMS-8 Content Blocks: Text Banner

- Branch: feat/mmsns-8-content-blocks-text-banner
- User Story: As a user, I should see the text banner matching the style of the design. As an editor, I should be able to set the variant, headline, and subhead.
- ACs
  - [x] Create new text-banner section
  - [x] Update/add tests

---

## [x] MMS-9 Content Blocks: Post List

- Branch: feat/mmsns-9-content-posts-list
- User Story: As a user, I should see the post list content block with content coming from the CMS. The items should link to detail pages for each item.
- ACs

  - [x] Get recent posts for homepage pre-render
  - [x] Build out posts-list content block type and create content as needed
  - [x] Style posts list page
  - [x] Build out post detail page
  - [x] Add styling to markdown and automatically set target and nofollow on external links
  - [x] Port all posts from old system to new system
  - [x] Set up SEO tags for posts
  - [x] Update/add tests

---

## [x] MMS-10 Content Blocks: Projects List

- Branch: feat/mmsns-10-content-projects-list
- User Story: As a user, I should see the projects list content block with content coming from the CMS. The items should link to detail pages for each item.
- ACs
  - [x] Build out projects-list content block type and create content as needed
  - [x] Build project list page
  - [x] Build project detail page with image lightbox
  - [x] Update/add tests

---

## [x] MMS-11 Breadcrumbs

- Branch: feat/mmsns-11-breadcrumbs
- User Story: As a user, I should navigable breadcrumbs on every page.
- ACs
  - [x] Create a breadcrumb component
  - [x] Add breadcrumbs to all sub-pages
  - [x] Update/add tests

---

## [x] MMS-12 Bio Page

- Branch: feat/mmsns-12-bio-page
- User Story: As a user, I should see a bio page with content.
- ACs
  - [x] Create a bio page using CMS elements
  - [x] Create any new section layouts as needed
  - [x] Update/add tests

---

## [x] MMS-13 Custom 404

- Branch: feat/mmsns-13-custom-404
- User Story: As a user, I should see a custom 404 page when I enter an unused URL on the site.
- ACs
  - [x] Refactor away from catch-all dynamic route since SSG will not permit this pattern to coexist with a 404 page.
  - [x] Create a custom 404 page
  - [x] Check the current state of the site in S3 and make sure everything still works.
  - [x] Update/add tests

---

## [x] MMS-14 Search Feature

- Branch: feat/mmsns-14-static-search
- User Story: As a user, I should have the ability to search for posts on the posts page and for projects on the projects page.
- [x] Write functions that create an index of words (3 letters or longer) as they appear in each item by content type.
- [x] Create search pages for posts & projects that uses the data created at build time to search through all pages live.
- [x] Update/add tests

---

## [x] MMS-15 XML Sitemap Generation

- Branch: feat/mmsns-15-xml-sitemap
- [x] Create sitemap XML generator
- [x] Trigger sitemap generator via npm
- [x] Update/add tests

---

## [ ] MMS-16 Content Pass

- Branch: feat/mmsns-16-content-pass
- User Story: As a user, I see new projects and properly formatted images & SEO content.
- [x] Fix: Truncate breadcrumbs ellipses for mobile
- [x] Go through all images used
- [x] Go through all metas & titles
- [x] Add New Projects:
  - [x] Spice Hustle
  - [x] Swatchity.com
  - [x] FlurbCo
- [x] Accessibility checks
- [x] Test updates
