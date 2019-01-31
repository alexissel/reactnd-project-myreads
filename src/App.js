import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import MyBooks from './MyBooks'
import { Route, Link } from 'react-router-dom'

class BooksApp extends Component {
  state = { books: [] }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      
      this.setState((currentState) => ({
        books: currentState.books.filter(b => b.id !== book.id).concat(book)
      }))
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <MyBooks books={books} onShelfUpdate={this.updateShelf} />

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() => (
          <SearchBooks myBooks={books} onShelfUpdate={this.updateShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
