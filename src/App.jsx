import { useEffect, useRef, useState } from 'react'
import BookResults from './components/BookResults.jsx'
import SearchForm from './components/SearchForm.jsx'
import ShelfPanel from './components/ShelfPanel.jsx'
import RecommendationPanel from './components/RecommendationPanel.jsx'
import { searchBooks } from './services/openLibrary.js'
import { loadShelf, saveShelf } from './services/libraryStorage.js'
import { getCommonGenre } from './data/recommendations.js'
import './App.css'

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  )
}

function App() {
  const [query, setQuery] = useState('')
  // Request status and its data change together, so they share one state object.
  const [search, setSearch] = useState({ status: 'idle', books: [], error: '', term: '', destination: '' })
  // Search results and the shelf both use these books, so the state lives in App.
  const [shelfBooks, setShelfBooks] = useState(loadShelf)
  const [shelfError, setShelfError] = useState('')
  const recommendedGenre = getCommonGenre(shelfBooks)
  const savedKeys = new Set(shelfBooks.map((book) => book.key))
  // A ref stores the controller without causing an extra render.
  const activeRequest = useRef(null)

  // The form starts the fetch; this effect aborts it if App unmounts.
  useEffect(() => {
    return () => activeRequest.current?.abort()
  }, [])

  function updateShelf(nextBooks) {
    setShelfBooks(nextBooks)
    setShelfError(saveShelf(nextBooks) ? '' : 'Your shelf could not be saved on this device.')
  }

  function handleSaveBook(book) {
    if (savedKeys.has(book.key)) return
    updateShelf([...shelfBooks, book])
  }

  function handleRemoveBook(bookKey) {
    updateShelf(shelfBooks.filter((book) => book.key !== bookKey))
  }

  function handleSearch(event) {
    event.preventDefault()
    runSearch(query, 'search')
  }

  async function runSearch(searchTerm, destination) {
    const searchTermTrimmed = searchTerm.trim()

    if (searchTermTrimmed === '') return

    setQuery(searchTermTrimmed)
    activeRequest.current?.abort()
    const controller = new AbortController()
    activeRequest.current = controller
    setSearch({ status: 'loading', books: [], error: '', term: searchTermTrimmed, destination })

    try {
      const books = await searchBooks(searchTermTrimmed, controller.signal)

      // Ignore a response if it no longer belongs to the active request.
      if (activeRequest.current === controller) {
        setSearch({ status: books.length > 0 ? 'success' : 'empty', books, error: '', term: searchTermTrimmed, destination })
      }
    } catch (error) {
      if (error.name === 'AbortError' || activeRequest.current !== controller) return

      const message = error instanceof TypeError
        ? 'Could not connect to Open Library. Check your connection and try again.'
        : error.message
      setSearch({ status: 'error', books: [], error: message, term: searchTermTrimmed, destination })
    }
  }

  return (
    <div id="top">
      <header className="site-header">
        <a className="brand" href="#top">paper trail<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="#search">Search</a>
          <a href="#shelf">Your shelf</a>
          <a href="#recommendations">Recommendations</a>
        </nav>
      </header>

      <main className="page-content">
        <section className="intro">
          <p className="eyebrow">YOUR READING LIFE</p>
          <h1>A good read is closer than you think.</h1>
          <p>Search for a book, save it to your shelf, and find your next read.</p>
        </section>

        <section className="content-section" id="search">
          <SectionHeading eyebrow="START EXPLORING" title="Find a book" />
          <SearchForm
            query={query}
            onQueryChange={setQuery}
            onSearch={handleSearch}
            isLoading={search.status === 'loading' && search.destination === 'search'}
          />
          <div
            className="search-feedback"
            aria-live="polite"
            aria-busy={search.status === 'loading' && search.destination === 'search'}
          >
            {search.destination !== 'recommendations' && search.status === 'idle' && <p className="empty-state">Your search results will appear here.</p>}
            {search.destination === 'search' && search.status === 'loading' && <p role="status">Searching Open Library…</p>}
            {search.destination === 'search' && search.status === 'empty' && <p role="status">No books found. Try another search.</p>}
            {search.destination === 'search' && search.status === 'error' && <p className="error-message" role="alert">{search.error}</p>}
            {search.destination === 'search' && search.status === 'success' && (
              <>
                <p className="small-note" role="status">{search.books.length} books found.</p>
                <BookResults books={search.books} savedKeys={savedKeys} onSave={handleSaveBook} />
              </>
            )}
          </div>
        </section>

        <section className="content-section" id="shelf">
          <SectionHeading eyebrow="YOUR READING LIFE" title="Your shelf" />
          <p className="small-note">{shelfBooks.length} {shelfBooks.length === 1 ? 'book' : 'books'}</p>
          {shelfError && <p className="error-message" role="alert">{shelfError}</p>}
          <ShelfPanel books={shelfBooks} onRemove={handleRemoveBook} />
        </section>

        <section className="content-section" id="recommendations">
          <SectionHeading eyebrow="BASED ON YOUR SHELF" title="A book to explore" />
          <RecommendationPanel
            genre={recommendedGenre}
            onSearch={(genre) => runSearch(genre, 'recommendations')}
            search={search}
            savedKeys={savedKeys}
            onSave={handleSaveBook}
          />
        </section>
      </main>

      <footer className="site-footer">Paper Trail · Find your next read</footer>
    </div>
  )
}

export default App
