Personal Blog App
📌 Project Description

This is a simple Personal Blog CRUD application built with vanilla JavaScript, HTML, and CSS.

The application allows users to:

Add new blog posts

Edit existing posts

Delete posts

Persist posts using localStorage

Validate form inputs before submission

Each post includes:

id

title

content

timestamp

The app demonstrates core front-end concepts such as DOM manipulation, event delegation, form validation, state management, and localStorage persistence.

🚀 How to Run the Application

Steps:

Download or clone the repository.

Open the project folder.

Double-click index.html
OR

Open index.html in your browser manually.

The application runs entirely in the browser.

🛠️ Technologies Used

HTML5

CSS3

JavaScript (ES6+)

Browser LocalStorage API

🧠 Development Reflection
Development Process

I structured the project around a simple state-driven architecture:

Store all posts inside a cart array (application state).

Render UI based on that state.

Update the state when adding, editing, or deleting.

Persist changes using localStorage.

I separated responsibilities into clear functions:

render() → updates UI

saveContent() → updates localStorage

loadContent() → restores saved posts

formSubmit() → handles add/update logic

editItem() → loads selected post into form

deleteItem() → removes post from state

This improved maintainability and prevented DOM-state mismatches.

Challenges Faced
1️⃣ Add vs Edit Logic Conflict

Initially, the form always added new posts even when editing.
I resolved this by introducing an edit mode using:

let currentItemId = null;


The form now checks whether it's in add mode or edit mode before updating the state.

2️⃣ Event Handling Issues

There was a conflict between click events and the submit event.
I fixed this by handling everything inside the form’s submit event only.

3️⃣ Keeping State and UI in Sync

Direct DOM manipulation caused inconsistencies.
I solved this by following a consistent flow:

Update state → Save to localStorage → Re-render UI


This ensured the DOM always reflects the current application state.

4️⃣ Working with dataset and IDs

Handling data-id attributes required converting string values to numbers to correctly compare IDs.

Example:

currentItemId = Number(li.dataset.id);

🔮 Future Improvements

Add search functionality.

Add sorting by date.

Add edit cancel button.

Improve UI/UX design.

📚 What This Project Demonstrates

DOM manipulation

Event delegation

Form validation

State management without frameworks

localStorage persistence

Basic CRUD operations

Clean architecture thinking