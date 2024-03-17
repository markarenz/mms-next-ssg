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
- [x] Build a homepage header (content block: page-header-orange)
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

## [ ] MMS-7 Content Blocks: Skill Icons

- Branch: feat/mmsns-7-content-blocks-skill-icons
- User Story: As a user, I should see the skill section on the homepage with icons for various skills.
- ACs
  - [ ] Build out skill-icons content block type and create icons as needed
  - [ ] Use CMS to determine order of icons
  - [ ] Update/add tests

---

## [ ] MMS-8 Content Blocks: Post List

- Branch: feat/mmsns-8-content-posts-list
- User Story: As a user, I should see the post list content block with content coming from the CMS. The items should link to detail pages for each item.
- ACs
  - [ ] Build out posts-list content block type and create content as needed
  - [ ] Update/add tests

---

## [ ] MMS-9 Content Blocks: Projects List

- Branch: feat/mmsns-9-content-projects-list
- User Story: As a user, I should see the projects list content block with content coming from the CMS. The items should link to detail pages for each item.
- ACs
  - [ ] Build out projects-list content block type and create content as needed
  - [ ] Update/add tests

---

## [ ] MMS-10 Dynamic Routing and 404

- Branch: feat/mmsns-10-dynamic-routing-and-404
- User Story: As a user, I should see a custom 404 page when I enter an unused URL on the site. As an editor, I should be able to create a page on the site without having to add a page to the `/app` directory.
- ACs
  - [ ] Create a catch-all page for dynamic routing and return 404 content when the page slug is not valid.
  - [ ] Create a custom 404 page
  - [ ] Check the current state of the site in S3 and make sure everything still works.
  - [ ] Update/add tests

---

## [ ] MMS-11 Search Feature

- Branch: feat/mmsns-11-static-search
- User Story: As a user, I should have the ability to search all content types.
- [ ] Write functions that create an index of words (3 letters or longer) as they appear in each item by content type.
- [ ] Create a search page that uses the data created at build time to search through all pages live.

---

## [ ] MMS-X SEO Elements

- [ ] sitemap XML generator
