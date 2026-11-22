# Paper Trail
## Mission M3 · Web Development I

Paper Trail is a small app for finding books. You can search for books, save the ones you like to your shelf, and get suggestions based on the genres you save the most. For this mission I rebuilt it in React and split the page into components.

## How to use it

1. Search for a book by its title, author, or subject.
2. Save the books you like to your shelf. They stay saved even if you reload the page.
3. Once you have a few books on your shelf, the app shows the genre you save the most. Click the "Find [genre] books" button to see more books from that genre.
4. Remove books from your shelf whenever you want.

## Use of AI

I used ChatGPT as a programming partner. I built the project step by step following my own ideas, adding one feature at a time (first the search, then the shelf, then the recommendations). After each step I reviewed the code, asked about the parts I didn't understand, and checked with npm run dev that everything still worked before committing to GitHub.

## Autopsy

1. At first the search and the recommendations shared the same state, but this caused a bug where clicking the recommendation button made my normal search results disappear. So I gave each section its own state.

2. I chose to make the genre selection more personalized. Open Library gives books lots of messy tags, so instead of just counting them I grouped them into a few genres (like Romance, Fantasy or Horror) and ignored really general ones like "Fiction". This way the recommendation actually matches what you like to read, instead of always picking the most common tag.
