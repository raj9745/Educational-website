# Educational Website (Talim.com)

This project is a static educational website with multiple pages (courses, course details, authentication UI, etc.). It is built using plain **HTML**, **CSS**, and **JavaScript** (no build step required).

## Tech Stack
- **HTML**: Page structure and DOM elements
- **CSS**: Styling (page-specific + shared responsive rules)
- **JavaScript**: Client-side interactivity
  - Course filtering on the Courses page
  - Course details population from the `course` query parameter
  - Enrollment modal flow
  - Auth UI visibility toggling using `sessionStorage`

## Project Structure
- `html/` - Pages (e.g., `course.html`, `course-details.html`, `login.html`, etc.)
- `css/` - Stylesheets (e.g., `course_style.css`, `course-details.css`)
- `js/` - JavaScript modules (e.g., `courses.js`, `course-details.js`, `auth-ui.js`)
- `assets/` - Images and media (e.g., `coding.mp4`)

## Key JavaScript Behaviors
### `js/courses.js`
- Filters course cards by category using `.tab-btn` buttons.
- Shows/hides the `#course-empty` message depending on results.
- Updates the visible course count in `#course-count` (if present).

### `js/course-details.js`
- Reads the selected course key from the URL query string: `?course=<key>`.
- Populates course details from an in-file `courseDatabase` object.
- Controls the video preview overlay:
  - Clicking `#trigger-play-video` starts the video.
- Handles enrollment modal actions:
  - Open modal via `#open-enroll-modal`
  - Close modal via `#close-enroll-modal`
  - Submit enrollment form (`#enroll-form`) shows success modal
  - Success modal close redirects to `dashboard.html`

### `js/auth-ui.js`
- Initializes UI visibility based on whether a user exists in `sessionStorage`.
- Uses the session key: `edu_current_user`.
- Shows/hides elements marked with:
  - `[data-auth-role="login"]`
  - `[data-auth-role="get-started"]`
  - `[data-auth-role="account"]`
- Implements Sign Out for `#signOutBtn`.

## How to Run
Because this is a static site:
1. Open any HTML file in your browser: The netry point of our code will be `../html/dashb`
2. Example (optional):
   - Start a local server from the project root and visit `html/course.html`.

## Notes
- Query parameter dependency: `course-details.html` expects `course` in the URL.
  - Example: `course-details.html?course=python`

## Attribution
The project uses Font Awesome for icons via CDN.

