# Sprint 3 (15 January – 23 January)

## What’s been done

This sprint focused on polishing, fixing edge cases, improving usability, accessibility and stability, as well as adding tests and project metadata. The application became more robust, user-friendly and closer to a production-ready state.

### Authentication & user flow improvements

- Improved authentication flow so:
  - A user **must log out before logging into another account or signing up**
  - Prevents confusion when switching accounts
- Added clearer feedback to avoid misunderstandings around user state

### UX & UI improvements

- Implemented a **tooltip system** for icon buttons:
  - Navigation open / close buttons
  - Save-to-bucketlist heart icon
- Fixed multiple UI issues introduced by tooltip integration:
  - Elements disappearing
  - Broken interactions
- Added **search bar** to:
  - Explore Races page
  - Bucketlist page
- Improved responsiveness and layout behavior on smaller screens:
  - Centered toast notifications on mobile
  - Ensured helper button content stays within viewport
  - Limited username in header to a single row

### Accessibility & visual fixes

- Reviewed and fixed **a11y issues**
- Corrected active state color for secondary buttons
- Fixed non-clickable bucketlist cards
- Ensured footer year updates automatically (`© 2026`)

### Admin & data handling improvements

- Updated **Admin All Races page** to:
  - Load only **12 races initially**
  - Load 12 more races on demand using a “Load more” button
  - Prevent page overload and improve performance and usability

### Testing

- Added **Vitest and V8**
- Wrote tests for the **Race Match page** to ensure:
  - Matching logic works as expected
  - No errors occur during calculation or rendering
- Revisited testing workflow after some time away, which was challenging but successful

### Project setup & documentation

- Added **meta tags** for better SEO and metadata handling
- Added **favicon**
- Updated **README** with relevant and up-to-date project information

---

## Reflections on the sprint

This sprint was more about refinement than building new major features. It focused on fixing issues, improving usability and strengthening the overall quality of the application.

### What I liked

- Fixing many small bugs made the app feel much more solid and consistent.
- Improving UX details (tooltips, search, toasts, layout fixes) had a noticeable impact on usability.
- Writing tests again with Vitest helped rebuild confidence in testing practices.
- Working through accessibility and responsive issues increased attention to detail.
