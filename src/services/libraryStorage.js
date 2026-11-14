const STORAGE_KEY = 'paper-trail-shelf'

export function loadShelf() {
  try {
    const storedBooks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

    if (!Array.isArray(storedBooks)) return []

    return storedBooks
      .filter((book) => book
        && typeof book.key === 'string'
        && typeof book.title === 'string'
        && book.title.trim() !== '')
      .map((book) => ({
        key: book.key,
        title: book.title.trim(),
        author: typeof book.author === 'string' ? book.author : '',
        year: Number.isInteger(book.year) ? book.year : null,
        coverId: Number.isInteger(book.coverId) ? book.coverId : null,
        subjects: Array.isArray(book.subjects)
          ? book.subjects.filter((subject) => typeof subject === 'string')
          : [],
      }))
  } catch {
    return []
  }
}

export function saveShelf(books) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
    return true
  } catch {
    return false
  }
}
