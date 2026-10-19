# Midterm Project

<!-- Write a one or two sentence description of your project here -->

Built on my Week06 homework (todo-list V2).

## Story

As someone who has bought a lot of books but hasn't read them yet, I want to track my reading progress (as a %), so that I feel more motivated to finish all my books.

## User Segment and Goal

**Who it's for:** people who want to keep track of their reading progress, whether they're big readers or people looking for motivation to read more.

**Goal:** let people track their reading progress on current books and keep a history of the books they've finished.

## Features

- Add, edit, and delete todos
- Mark todos as done with a checkbox
- Filter todos (all / active / done)
<!-- add your new features here -->

## Tech Used

- React 19 + Vite
- Tailwind CSS
- Axios
- json-server (fake REST API that saves to `db.json`)

## How to Run

You need **two terminal tabs**:

1. Install packages (only the first time):
   ```
   npm install
   ```
2. Tab 1 — start the server:
   ```
   npm run server
   ```
3. Tab 2 — start the app:
   ```
   npm run dev
   ```
4. Open the link!!

## Props vs. Context
I decided to use tbd lolol!!!!!

## Developer Checklist

### Before (my plan)

**Active page**

- [ ] **Add a book**
  - [ ] Requests
    - [ ] Send a `POST` request to save the new book
  - [ ] Inputs (in `createBook`)
    - [ ] Title input
    - [ ] Total number of pages input
    - [ ] Current page input (optional)
    - [ ] Automatically set the new book as active
  - [ ] State
    - [ ] One piece of state for each input
  - [ ] Display
    - [ ] Book data is passed down as props to `bookEdit` and passed up to `bookList`
- [ ] **Update pages read**
  - [ ] Requests
    - [ ] Send a `PATCH` request to update the book
  - [ ] Inputs (in `EditBook`)
    - [ ] When progress reaches 100%, move the book to the Finished tab
  - [ ] State
    - [ ] Use the state passed from `addBook`
  - [ ] Display
    - [ ] Used by `addBook`
- [ ] **Finish a book**
  - [ ] State
    - [ ] If progress is under 100%, set `finished: false`
- [ ] **Delete a book**
  - [ ] Ask for confirmation before deleting
  - [ ] Requests
    - [ ] Send a `DELETE` request
  - [ ] State
    - [ ] Use the state passed from `addBook` to remove the book
  - [ ] Display
    - [ ] Delete button lives inside the parent `bookItem`

**Finished page**

- [ ] list of all finished

### After (what I actually had to do)
- [ ] 

### The Gap
<!-- What did I forget? Compare the two lists. -->

## Project Structure

```
src/
  App.jsx              main component, holds the todos + filter state
  api.js               all the requests to the server
  components/
    TodoCreate.jsx     form to add a todo
    TodoList.jsx       renders the list
    TodoItem.jsx       one todo row
    TodoEdit.jsx       edit form for a todo
    TodoFilter.jsx     filter buttons
db.json                the "database" json-server reads/writes
```

## Notes / Reflection

<!-- What did you learn? What was hard? What would you do next? -->
need to write!!!!!!

