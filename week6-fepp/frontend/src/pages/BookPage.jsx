import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookPreview from "../components/BookPreview";

const BookPage = () => {
  const [book, setBook] = useState(null);
  const params = useParams();
  const bookId = params.id;
  async function fetchBook() {
    const response = await fetch(`/api/books/${bookId}`);
    if (response.ok) {
      const bookData = await response.json();
      setBook(bookData);
    } else {
      console.error("Failed to fetch book details");
    }
  }
  useEffect(() => {
    fetchBook();
  }, []);
  return (
    <div className="book-preview">
      {book && <BookPreview book={book} />}
    </div>
  );
};

export default BookPage;
