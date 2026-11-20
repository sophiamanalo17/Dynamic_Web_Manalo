# Favourites slice: answers

## 1. What is the action type string, and where do its two halves come from?

The toggle dispatches `favourites/favouriteToggled`. The first half, `favourites`, comes from the `name` I gave the slice in `createSlice`, and the second half, `favouriteToggled`, comes from the name of the reducer function inside `reducers`. I never typed that string myself: `createSlice` joins the two with a slash when it generates the action creator.

## 2. Why a list of ids, rather than a `favourite: true` flag on each print?

The comment in `prints.js` says the catalogue is not state, because it never changes while the app runs, so it lives in a plain module export instead of the store. To put a `favourite: true` flag on a print, I would first have to copy the whole catalogue into the store, and then the store would be responsible for every print's title, price and colour, and for keeping that copy in sync with `prints.js`. With a list of ids, the store only owns the one fact it actually needs to own, which prints the user has favourited, and the catalogue stays where it is.

## 3. A print is removed from the catalogue, and somebody had favourited it. What happens?

The app does not crash, but the numbers stop agreeing: if I favourite two prints and then delete one from `prints.js`, the star count in the header still says 2, while the Favs filter only shows 1 print. This happens because `selectFavouriteCount` counts the ids in the store, and nothing removes the deleted print's id, so the store is still holding an id that no longer matches any print. A real app would clean up ids that no longer match a print, or count only the favourites that still exist in the catalogue.
