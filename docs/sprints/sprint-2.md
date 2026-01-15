# Sprint 2 (4 January – 15 January)

## What’s been done

This sprint focused on implementing core functionality, completing authentication, building admin features and significantly improving the overall user experience. The application moved from a mostly static foundation to a fully interactive product.

### Core pages and features

- Built the **Home page**
- Refactored race display logic to avoid duplicated code and improve reusability
- Fixed race card images and added **fallback images**
- Improved **responsiveness** across devices (especially mobile)
- Fixed page scroll behavior so navigation always starts at the top
- Enhanced **Explore Races page**:
  - Added title and filters
  - Implemented pagination (12 races at a time)
  - Added **search bar** (search by race title or location)

### Race management

- Implemented **Add Race** functionality:
  - Form validation (e.g. location format)
  - HelperButton guidance
  - Cancel confirmation modal
  - Success and error toasters
  - Input field error handling
- Added logic to automatically delete outdated races

### Admin panel

- Built **Admin Pending Races page**
  - New races must be approved or rejected before appearing publicly
- Added **Admin All Races view**
  - Admin can delete races
- Implemented **User Management** for admin
- Added visual separation in race cards when viewed in admin mode

### Authentication & authorization

- Fully implemented **Auth.js** for:
  - Users
  - Admins
- Added proper error handling and feedback with toasters
- Improved auth flow:
  - Users must log out before logging into another account or signing up again (to avoid confusion with bucketlist state)

### User features

- Implemented **Bucketlist** functionality:
  - Logged-in users can save/remove races
  - Heart icon interaction
  - Remove button in bucketlist
  - Success and error toasters depending on auth state
- Built **Race Match page**:
  - Form-based matching system
  - Calculates and displays race matches based on percentage
  - Limited to core options for initial version

### UX & UI improvements

- Added **tooltip system** for icon buttons:
  - Navigation open/close
  - Bucketlist save icon
- Fixed styling and layout issues caused by tooltip integration
- Added consistent feedback through toasters across the app

### Deployment & stability

- Fixed **Vercel deployment issue** caused by missing environment variable
- Ensured correct data fetching in production

---

## Reflections on the sprint

This sprint was intense but extremely rewarding. The project evolved from a UI-focused setup into a fully functional application with real user flows, admin control and authentication.

### What I liked

- Completing **authentication** was challenging but very satisfying, especially as a first full implementation.
- Building the **admin flow** (pending races, approvals, user management) made the project feel realistic and production-ready.
- Incremental UX improvements (toasters, tooltips, search, validation) noticeably improved usability.
- Solving real bugs (deployment, tooltips, image handling) helped deepen my understanding of Next.js and the app lifecycle.

### What I will improve in the next sprint

- Refactor and clean up where needed.
- Improve performance and loading states on data-heavy pages.
- Continue polishing UI details and accessibility.
- Write test for match race functionality.
