import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BookPage = ({ isAuthenticated }) => {
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
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    const response = await fetch(`/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
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
if (!book){
  return <div>Loading...</div>;
}
  return (
    <div className="book-preview">
      <>
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <p>ISBN: {book.isbn}</p>
        <p>Publisher: {book.publisher}</p>
        <p>Genre: {book.genre}</p>
        <p>Available: {book.availability.isAvailable ? "Yes" : "No"}</p>
        <p>Due Date: {book.availability.dueDate || "N/A"}</p>
        <p>Borrower: {book.availability.borrower || "None"}</p>
        <button onClick={() => navigate("/")}>Back</button>
        {isAuthenticated && <><button onClick={() => deleteBook(book._id)}>Delete</button>
          <button onClick={() => navigate("/edit-book/" + book._id)}>Edit</button></>}
      </>
    </div>
  );
};

export default BookPage;
