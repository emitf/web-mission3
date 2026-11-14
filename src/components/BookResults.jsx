import BookCard from './BookCard.jsx'

export default function BookResults({ books, savedKeys, onSave }) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          isSaved={savedKeys.has(book.key)}
          onSave={onSave}
        />
      ))}
    </div>
  )
}
