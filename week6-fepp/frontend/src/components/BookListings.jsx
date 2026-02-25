import { useEffect, useState } from "react";
import BookListing from "./BookListing";

const BookListings = () => {
  const [books, setBooks] = useState([]);

  async function fetchAllBooks() {
    const response = await fetch("/api/books");
    if (response.ok) {
      const booksList = await response.json();
      setBooks(booksList);
    } else {
      console.error("Failed to fetch books");
    }
  }

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div className="book-list">
      {books && books.map((book, index) =>
        <BookListing key={index} book={book} />
      )}
    </div>
  );
};

export default BookListings;
