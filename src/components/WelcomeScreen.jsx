import { useState } from "react";

function WelcomeScreen({ users, setActiveUser, setUsers }) {
  const [newUser, setNewUser] = useState("");

  const handleSelect = (e) => {
    setActiveUser(e.target.value);
  };

  const handleAddUser = () => {
    const trimmed = newUser.trim();
    if (trimmed && !users.includes(trimmed)) {
      setUsers((prev) => [...prev, trimmed]);
    }
    if (trimmed) {
      setActiveUser(trimmed);
    }
  };

  return (
    <div>
      <h2>Vem är du?</h2>
      <select defaultValue="" onChange={handleSelect}>
        <option value="" disabled>Välj användare</option>
        {users.map((user, i) => (
          <option key={i} value={user}>{user}</option>
        ))}
      </select>

      <p>Eller skriv ett nytt namn:</p>
      <input value={newUser} onChange={(e) => setNewUser(e.target.value)} />
      <button onClick={handleAddUser}>Fortsätt</button>
    </div>
  );
}

export default WelcomeScreen;
