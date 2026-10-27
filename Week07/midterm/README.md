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
icons from https://griddyicons.com/
You need **two terminal tabs**:

1. Install packages (only the first time):
   ```
   npm install
   npm install griddy-icons
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
I decided to props because in all honesty, I would get confused when we would prop drill and certain components had different nanes for the same thing. For example, the edit function changes names when it gets passed down to its children. In App.jsx its EditBookById, but when BookList.jsx gets the function its onEdit. 

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

- [ ] list of all finished (based on finished state)

### After (what I actually had to do)
- [ ] create piece of state to track if create modal would be showing
- [ ] create error states of all the forms 
- [ ] condense useStates into one object for all inputs --> create new component for form field
- [ ] style everything to look more book-like
- [ ] add a progress bar that used current_page and total_pages
- [ ] change all original names of components


### The Gap
<!-- What did I forget? Compare the two lists. -->
- Something that I didn't necessarily write in my list was how I would make values 'undefined' when thats not the same as '' or just 0 or false. Another thing I forgot was to make sure all my forms had error messages that someone could read to understand what went wrong. On that note, I also had to come up with edge cases of like if a user inputs X current page and X total of pages for a book for onCreate, then it should automatically go to the finished list. I think just coming up with edge cases for when the 'happy path' isn't taken is something I didn't think about until the end. 

## Notes / Reflection

<!-- What did you learn? What was hard? What would you do next? -->
Something I learned was establishing a set plan before starting to code. I think I began the project with a loose idea of what I wanted to do requirement wise. I think I should have thought more about how I wanted the UI to look like because in the middle, I wanted to add a modal to the app, but had to restructure everything. 

Something else that was hard was breaking down the components to its children. For example after Thursday's class where we could be use controlled inputs and validation, I implemented this into my project, but the components became so long so I broke ut ip into the actual create modal, to form, to even the input. In a sense, thinking about thses things atomically was something I had to adapt to both technically, but also mentally. 

If I had time to do more, something I would want to try doing is make a disabled/active state for buttons, maybe find a public api that had the book cover or titles and then maybe forms could auto-fill. Additioanlly, something I would want to do next is to create a way to sort finished books by title (a-z) or date finished. 