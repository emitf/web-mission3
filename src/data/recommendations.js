const GENERAL_SUBJECTS = new Set([
  'fiction',
  'juvenile fiction',
  'young adult fiction',
  "children's fiction",
  'childrens fiction',
  'accessible book',
  'protected daisy',
  'large type books',
])

const GENRES = [
  { name: 'Romance', words: ['romance', 'romantic fiction', 'rom-com', 'love stories'] },
  { name: 'Mystery', words: ['mystery', 'detective'] },
  { name: 'Crime', words: ['crime'] },
  { name: 'Thriller', words: ['thriller', 'suspense'] },
  { name: 'Dystopian', words: ['dystop'] },
  { name: 'Science fiction', words: ['science fiction', 'science-fiction', 'sci-fi', 'scifi'] },
  { name: 'Fantasy', words: ['fantasy'] },
  { name: 'Horror', words: ['horror'] },
  { name: 'Adventure', words: ['adventure'] },
  { name: 'History', words: ['history', 'historical'] },
]

function getBookGenres(subjects) {
  const cleanSubjects = (Array.isArray(subjects) ? subjects : [])
    .filter((subject) => typeof subject === 'string')
    .map((subject) => subject.trim().toLowerCase())
    .filter((subject) => (
      subject !== ''
      && !GENERAL_SUBJECTS.has(subject)
      && !subject.includes('literature')
      && !subject.includes('staff pick')
    ))

  const genres = GENRES
    .filter(({ words }) => cleanSubjects.some((subject) => (
      words.some((word) => subject.includes(word))
    )))
    .map(({ name }) => name)

  return genres.includes('Dystopian')
    ? genres.filter((genre) => genre !== 'Science fiction')
    : genres
}

export function getCommonGenre(books) {
  const genreCounts = books.reduce((counts, book) => {
    getBookGenres(book.subjects).forEach((genre) => {
      counts.set(genre, (counts.get(genre) || 0) + 1)
    })
    return counts
  }, new Map())

  const mostCommon = GENRES
    .map(({ name }) => [name, genreCounts.get(name) || 0])
    .reduce((best, current) => (current[1] > best[1] ? current : best), ['', 0])

  return mostCommon[1] > 0 ? mostCommon[0] : null
}
