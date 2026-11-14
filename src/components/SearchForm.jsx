export default function SearchForm({ query, onQueryChange, onSearch, isLoading }) {
  return (
    <form className="search-panel" onSubmit={onSearch}>
      <label htmlFor="book-search">What would you like to read?</label>
      <div className="search-row">
        <input
          id="book-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Try a title, author, or subject"
          required
        />
        <button type="submit" disabled={isLoading || query.trim() === ''}>
          {isLoading ? 'Searching…' : 'Search'}
        </button>
      </div>
      <p className="small-note">Search by book title, author, or subject.</p>
    </form>
  )
}
