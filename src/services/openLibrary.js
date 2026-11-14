const SEARCH_URL = 'https://openlibrary.org/search.json'
const BOOK_FIELDS = 'key,title,author_name,first_publish_year,cover_i,subject'
const REQUEST_TIMEOUT = 10_000

export async function searchBooks(query, signal) {
  const parameters = new URLSearchParams({
    q: query,
    fields: BOOK_FIELDS,
    limit: '12',
  })
  const controller = new AbortController()
  let timedOut = false
  const timeoutId = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, REQUEST_TIMEOUT)
  const abortRequest = () => controller.abort()

  if (signal?.aborted) controller.abort()
  else signal?.addEventListener('abort', abortRequest, { once: true })

  try {
    let response

    try {
      response = await fetch(`${SEARCH_URL}?${parameters}`, { signal: controller.signal })
    } catch (error) {
      if (signal?.aborted) throw error
      if (timedOut) throw new Error('Open Library took too long to respond. Please try again.')
      throw error
    }

    if (!response.ok) {
      throw new Error(`Open Library responded with status ${response.status}.`)
    }

    let data

    try {
      data = await response.json()
    } catch (error) {
      if (signal?.aborted) throw error
      if (timedOut) throw new Error('Open Library took too long to respond. Please try again.')
      throw new Error('Open Library returned unreadable data.')
    }

    if (!Array.isArray(data?.docs)) {
      throw new Error('Open Library returned an unexpected response.')
    }

    return data.docs
      .filter((book) => book
        && typeof book.key === 'string'
        && typeof book.title === 'string'
        && book.title.trim() !== '')
      .map((book) => ({
        key: book.key,
        title: book.title.trim(),
        author: Array.isArray(book.author_name)
          ? book.author_name.filter((name) => typeof name === 'string').join(', ')
          : '',
        year: Number.isInteger(book.first_publish_year) ? book.first_publish_year : null,
        coverId: Number.isInteger(book.cover_i) ? book.cover_i : null,
        subjects: Array.isArray(book.subject)
          ? book.subject.filter((subject) => typeof subject === 'string')
          : [],
      }))
  } finally {
    clearTimeout(timeoutId)
    signal?.removeEventListener('abort', abortRequest)
  }
}
