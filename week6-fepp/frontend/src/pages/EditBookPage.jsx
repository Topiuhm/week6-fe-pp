import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditBookPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const bookId = params.id;
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [isbn, setIsbn] = useState();
  const [publisher, setPublisher] = useState();
  const [genre, setGenre] = useState();
  const [isAvailable, setIsAvailable] = useState(true);
  const [dueDate, setDueDate] = useState();
  const [borrower, setBorrower] = useState();


  async function fetchBook() {
    const response = await fetch(`/api/books/${bookId}`);
    if (response.ok) {
      const bookData = await response.json();
      setTitle(bookData.title);
      setAuthor(bookData.author);
      setIsbn(bookData.isbn);
      setPublisher(bookData.publisher);
      setGenre(bookData.genre);
      setIsAvailable(bookData.availability.isAvailable);
      setDueDate(bookData.availability.dueDate);
      setBorrower(bookData.availability.borrower);
    } else {
      console.error("Failed to fetch book details");
    }
  }

  useEffect(() => {
    fetchBook();
  }, []);

  async function updateBook() {
    const newBook = {
      title,
      author,
      isbn,
      publisher,
      genre,
      availability: {
        isAvailable,
        dueDate,
        borrower
      }
    }
    const response = await fetch(`/api/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    if (response.ok) {
      navigate("/books/"+bookId);
    } else {
      console.error("Failed to update book");
    }
  }

  return (
    <div className="create">
      <h2>Update Book</h2>
      <form>
        <label>Book Title:</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Author:</label>
        <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} />
        <label>ISBN:</label>
        <input type="text" required value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        <label>Publisher:</label>
        <input type="text" required value={publisher} onChange={(e) => setPublisher(e.target.value)} />
        <label>Genre:</label>
        <input type="text" required value={genre} onChange={(e) => setGenre(e.target.value)} />
        <label>Available:</label>
        <select value={isAvailable.toString()} onChange={(e) => setIsAvailable(e.target.value === "true")}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <label>Borrower:</label>
        <input type="text" value={borrower} onChange={(e) => setBorrower(e.target.value)} />
        <button onClick={(e) => { e.preventDefault(); updateBook(); }}>Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;
