import BookResults from './BookResults.jsx'

export default function SearchResults({ search, savedKeys, onSave }) {
  return (
    <div
      className="search-feedback"
      aria-live="polite"
      aria-busy={search.status === 'loading'}
    >
      {search.status === 'idle' && <p className="empty-state">Your search results will appear here.</p>}
      {search.status === 'loading' && <p>Searching Open Library…</p>}
      {search.status === 'empty' && <p>No books found. Try another search.</p>}
      {search.status === 'error' && <p className="error-message" role="alert">{search.error}</p>}
      {search.status === 'success' && (
        <>
          <p className="small-note">{search.books.length} {search.books.length === 1 ? 'book' : 'books'} found.</p>
          <BookResults books={search.books} savedKeys={savedKeys} onSave={onSave} />
        </>
      )}
    </div>
  )
}
