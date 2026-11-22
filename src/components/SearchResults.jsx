import BookResults from './BookResults.jsx'

export default function SearchResults({ search, savedKeys, onSave }) {
  const isSearch = search.destination === 'search'

  return (
    <div
      className="search-feedback"
      aria-live="polite"
      aria-busy={isSearch && search.status === 'loading'}
    >
      {search.destination !== 'recommendations' && search.status === 'idle' && <p className="empty-state">Your search results will appear here.</p>}
      {isSearch && search.status === 'loading' && <p role="status">Searching Open Library…</p>}
      {isSearch && search.status === 'empty' && <p role="status">No books found. Try another search.</p>}
      {isSearch && search.status === 'error' && <p className="error-message" role="alert">{search.error}</p>}
      {isSearch && search.status === 'success' && (
        <>
          <p className="small-note" role="status">{search.books.length} {search.books.length === 1 ? 'book' : 'books'} found.</p>
          <BookResults books={search.books} savedKeys={savedKeys} onSave={onSave} />
        </>
      )}
    </div>
  )
}
