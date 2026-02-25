import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser() {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } else {
      console.error("Failed to login");
    }
  }

  return (
    <div className="create">
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={(e) => {
          e.preventDefault();
          loginUser();
        }}>Login</button>
      </form>
    </div>
  )
}
