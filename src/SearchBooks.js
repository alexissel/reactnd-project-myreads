import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onShelfUpdate: PropTypes.func.isRequired
  }

  state = { query: '', books: [], result: '' }

  searchBook = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.length > 0) {
          books.map((book) => (
            this.props.myBooks.filter(b => b.id === book.id).map(b => book.shelf = b.shelf)
          ));

          this.setState({ books: books, result: 'yes' })
        } else {
          this.setState({ books: [], result: 'no' })
        }
      })

      this.setState({ query: query })
    }
    else {
      this.setState({ query: '', books: [], result: '' })
    }
  }

  render() {
    const { query, books, result } = this.state
    const { onShelfUpdate } = this.props
    let searchResult

    if (query.length > 0) {
      if (result === 'yes') {
        searchResult = (<Book books={books} changeShelf={onShelfUpdate} />)
      }
      else {
        searchResult = (<p>Sorry, we couldn't find any books for you!</p>)
      }
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>

          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => (this.searchBook(e.target.value))} />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks