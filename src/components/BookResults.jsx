import BookCard from './BookCard.jsx'

export default function BookResults({ books }) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  )
}
