import BookResults from './BookResults.jsx'

export default function RecommendationPanel({ genre, onSearch, search, savedKeys, onSave }) {
  if (!genre) {
    return <div className="empty-state">Save books with recognizable genres to get a suggestion.</div>
  }

  const isCurrentRecommendation = search.term === genre
  const isLoading = isCurrentRecommendation && search.status === 'loading'
  const hasResults = isCurrentRecommendation && search.status === 'success'

  return (
    <div className="recommendation-panel">
      <div>
        <p>Your most common genre is <strong>{genre}</strong>.</p>
        <button type="button" onClick={() => onSearch(genre)} disabled={isLoading}>
          {isLoading ? 'Searching…' : `Find ${genre} books`}
        </button>
      </div>
      {isLoading && <p role="status">Searching Open Library…</p>}
      {isCurrentRecommendation && search.status === 'empty' && (
        <p role="status">No books found for this subject. Try a regular search.</p>
      )}
      {isCurrentRecommendation && search.status === 'error' && (
        <p className="error-message" role="alert">{search.error}</p>
      )}
      {hasResults && (
        <>
          <p className="small-note" role="status">Books related to {genre}</p>
          <BookResults books={search.books} savedKeys={savedKeys} onSave={onSave} />
        </>
      )}
    </div>
  )
}
