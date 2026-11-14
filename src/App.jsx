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
          <div className="search-panel">
            <label htmlFor="book-search">What would you like to read?</label>
            <div className="search-row">
              <input id="book-search" type="search" placeholder="Try a title, author, or subject" disabled />
              <button type="button" disabled>Search</button>
            </div>
            <p className="small-note">Book search is coming in the next step.</p>
          </div>
        </section>

        <section className="content-section" id="shelf">
          <SectionHeading eyebrow="YOUR READING LIFE" title="Your shelf" />
          <div className="empty-state">Books you save will appear here.</div>
        </section>

        <section className="content-section" id="recommendations">
          <SectionHeading eyebrow="BASED ON YOUR SHELF" title="A book to explore" />
          <div className="empty-state">A subject suggestion will appear after you save books.</div>
        </section>
      </main>

      <footer className="site-footer">Paper Trail · Find your next read</footer>
    </div>
  )
}

export default App
