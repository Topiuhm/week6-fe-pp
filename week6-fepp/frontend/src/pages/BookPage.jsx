import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookPreview from "../components/BookPreview";

const BookPage = () => {
  const [book, setBook] = useState(null);

  const navigate = useNavigate();
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

  async function deleteBook(id) {
    const response = await fetch(`/api/books/${bookId}`, {
      method: "DELETE"
    });
    if (response.ok) {
      navigate("/");
    } else {
      console.error("Failed to delete book");
    }
  }

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div className="book-preview">
      {book && <BookPreview book={book} onDelete={() => deleteBook(book.id)} />}
    </div>
  );
};

export default BookPage;
