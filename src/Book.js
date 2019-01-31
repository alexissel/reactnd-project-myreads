import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, changeShelf } = this.props
    const noImageLinks = 'https://vignette.wikia.nocookie.net/darkseries/images/9/96/No_book_cover_lg.jpg'

    return (
      <ol className="books-grid">
        { books.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${ book.imageLinks ? book.imageLinks.smallThumbnail : noImageLinks }")`, backgroundSize: 'cover' }}></div>
    
                <div className="book-shelf-changer">
                  <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => changeShelf(book, e.target.value)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
    
              <div className="book-title">{book.title}</div>

              { book.authors && book.authors.map((author, index) => (
                <div key={index} className="book-authors">
                  {author}
                </div>
              )) }
            </div>
          </li>
        )) }
      </ol>
    )
  }
}

export default Book