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

## [ ] MMS-2 Pagination

- User Story
  As a user, I should have a common pagination experience that leads me around a list of posts or other data types. If we are on page 1 of the archives (/posts/archive/1), for example, the "previous" button should lead us to the main posts page (/posts).
- ACs
  - [ ] Reusable Pagination component that can be used for posts or any other type of iterable page/data
  - [ ] Handle going to and from the base page and archives.

---

Page editing

## MMS- Image Handling

As a content editor, I should be able to add images easily and utilize them in pages and posts with

---
