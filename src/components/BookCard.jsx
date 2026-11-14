import { useState } from 'react'

export default function BookCard({ book }) {
  // This card owns the image-error state because it only affects its cover.
  const [coverUnavailable, setCoverUnavailable] = useState(!book.coverId)
  const coverUrl = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
    : ''

  return (
    <article className="book-card">
      {coverUnavailable ? (
        <div className="book-cover cover-placeholder">Cover unavailable</div>
      ) : (
        <img
          className="book-cover"
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          onError={() => setCoverUnavailable(true)}
        />
      )}
      <div className="book-card-content">
        <h3>{book.title}</h3>
        <p>{book.author || 'Author unknown'}</p>
        <p>{book.year || 'Publication year unknown'}</p>
      </div>
    </article>
  )
}
