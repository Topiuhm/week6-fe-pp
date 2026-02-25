const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Book Library</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/add-book">Add Book</a>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
        <a onClick={() => localStorage.removeItem("user")}>Logout</a>
      </div>
    </nav>
  );
};

export default Navbar;
