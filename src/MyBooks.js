import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class MyBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfUpdate: PropTypes.func.isRequired
  }

  render() {
    const { books, onShelfUpdate } = this.props
    const shelfTypes = [
      { type: 'currentlyReading', title: 'Currently Reading' },
      { type: 'wantToRead', title: 'Want to Read' },
      { type: 'read', title: 'Read' }
    ]

    return (
      <div className="list-books-content">
        <div>
          { shelfTypes.map((shelf) => {
            const myBooks = books.filter(book => book.shelf === shelf.type)

            return (
              <div className="bookshelf" key={shelf.type}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                
                  <div className="bookshelf-books">
                    <Book books={myBooks} changeShelf={onShelfUpdate} />
                  </div>
              </div>
            )
          }) }
        </div>
      </div>
    )
  }
}

export default MyBooks