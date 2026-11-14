import BookCard from './BookCard.jsx'

export default function ShelfPanel({ books, onRemove }) {
  if (books.length === 0) {
    return <div className="empty-state">Books you save will appear here.</div>
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onRemove={onRemove} />
      ))}
    </div>
  )
}
