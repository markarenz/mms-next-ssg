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

## [ ] MMS-3 Page Structure Basics

- Branch: feat/mmsns-3-page-structure-basics
- User Story
  As a content editor, I should be able to add Markdown files in a specific structure with associated front-matter data to create pages on the site, using an image CDN.
- ACs
  - [ ] Set up image CDN
  - [ ] Set up dynamic routing and SSG slug iteration
  - [ ] Create format and type for page type and markdown format
  - [ ] Create basic structure for some initial sections. Each section would have a type declaration and markdown format.
  - [ ] Create common image component to handle image CDN
  - [ ] Create a pair of dummy pages with internal links
  - [ ] Test in S3 to confirm everything still works
  - [ ] Update/add tests

---

## [ ] MMS-4 ...

- Branch:
- User Story
- ACs
  - [ ]

---
