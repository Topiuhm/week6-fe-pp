import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [membershipStatus, setMembershipStatus] = useState(false);

  async function signupUser() {
    const newUser = {
      name,
      email,
      password,
      phone_number: phoneNumber,
      gender,
      date_of_birth: dateOfBirth,
      membership_status: membershipStatus
    };
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    } else {
      console.error("Failed to register new user");
    }
  }

  return (
    <div className="create">
      <h2>Signup</h2>
      <form>
        <label>Name:</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email:</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Phone number:</label>
        <input type="tel" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <label>Gender:</label>
        <input type="text" required value={gender} onChange={(e) => setGender(e.target.value)} />
        <label>Date of birth:</label>
        <input type="date" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        <label>Membership status:</label>
        <select value={membershipStatus} onChange={(e) => setMembershipStatus(e.target.value === "true")}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button onClick={(e) => {
          e.preventDefault();
          signupUser();
        }}>Signup</button>
      </form>
    </div>
  )
}
