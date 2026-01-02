# Sprint 1 (22 December – 2 January)

## What’s been done

During this sprint, I focused on setting up the foundation for the project and creating reusable components to accelerate development in future sprints. Key accomplishments include:

### Project setup

- Initialized the project using **Next.js**
- Set up **MongoDB** and connected it to the project
- Integrated **Tailwind CSS** and defined variables for colors and fonts

### Design and UI

- Finalized the **Figma design**
- Created **wireframes** and conducted **user tests** to validate design choices
- Developed **header** and **navigation**
- Created **footer**
- Built **reusable components**:
  - Race Card: Displays race info
  - Buttons: Standardized styles for consistent UI
  - AuthSwitch: Toggles between login/signup views
  - HelperButton: Quick actions with tooltip
  - InputField: Standardized text inputs
  - Toasters: Feedback notifications for user actions

- Implemented **race card skeleton loading state** for better UX during data fetch

### Routing and Internationalization

- Added **app routing** for all pages
- Added **common.json** to manage English text strings and prepare for future localization

### Authentication (frontend)

- Developed **Login** and **Signup pages** (frontend only)
- Developed **Admin Login page** (frontend only)
- Installed **Auth.js** (backend integration pending)

### Deployment and error handling

- Deployed the project on **Vercel**
- Added **Error page** and **404 page**

---

## Reflections on the sprint

This sprint went really well, especially considering the **Christmas and New Year’s break**. I am proud of how much progress I managed to make in a short period of time.

### What I liked

- The **systematic approach** I took with branches and commits improved my workflow significantly.
- Creating **reusable components** early will save time in the upcoming sprints.
- The **Figma design finalization and user testing** gave me confidence that the UI/UX is on the right track.

### What I will improve in the next sprint

- **Branch naming convention**: Instead of numbering branches, I will start naming them according to their function (e.g., `feature/login-page` or `component/race-card`) for better clarity.
- Begin **Auth.js integration** to enable full authentication flow.
