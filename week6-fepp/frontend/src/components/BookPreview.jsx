import { useNavigate } from "react-router-dom";

export default function BookPreview({ book, onDelete }) {
  const navigate = useNavigate();
  return (
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
      <button onClick={() => onDelete()}>Delete</button>
      <button onClick={() => navigate("/edit-book/"+book._id)}>Edit</button>
    </>
  );
}
