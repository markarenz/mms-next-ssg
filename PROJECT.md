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

## [ ] MMS-4 Header & Footer

- Branch: feat/mmsns-4-header-footer
- User Story: As a user, I should be able to see the navigation and footer for every page. As a content editor, I should be able to swap out the header depending on the page.
- [x] Build out global nav
- [x] Add a header & footer slot to the CMS page structure to make it easy to swap them out
- [x] Build a homepage header
- [x] Build a footer
- [x] Update/add tests

---

## [ ] MMS-5 Homepage Content

- Branch: feat/mmsns-5-homepage-content
- User Story: As a user, I should be able to go to the homepage and see styled content based on the Markdown-driven CMS.
- ACs
  - [ ] Build out all CMS section components to handle the homepage content
  - [ ] Where possible create and use common components
  - [ ] Make sure accessibility is correct via the Axe audit
        loading
  - [ ] Create a pair of dummy pages with internal links
  - [ ] Test in S3 to confirm everything still works
  - [ ] Update/add tests

---

## [ ] MMS-X Search Feature

- User Story: As a user, I should have the ability to search all content types.
- [ ] Write functions that create an index of words (3 letters or longer) as they appear in each item by content type.
- [ ] Create a search page that uses the data created at build time to search through all pages live.

---

## [ ] MMS-X SEO Elements

- [ ] sitemap XML generator
