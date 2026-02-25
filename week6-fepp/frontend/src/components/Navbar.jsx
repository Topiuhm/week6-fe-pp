const Navbar = ({ isAuthenticated, setIsAuthenticated}) => {

  return (
    <nav className="navbar">
      <h1>Book Library</h1>
      <div className="links">
        <a href="/">Home</a>
        
        {isAuthenticated ? (
          <>
            <a href="/add-book">Add Book</a>
            <a onClick={(e) => {e.preventDefault(); localStorage.removeItem("user"); setIsAuthenticated(false);}}>Logout</a>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
