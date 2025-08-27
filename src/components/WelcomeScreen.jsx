import { useState } from "react";

function WelcomeScreen({ users, setActiveUser, setUsers }) {
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState("");

  const handleSelect = (e) => {
    setActiveUser(e.target.value);
    setError("");
  };

  const handleAddUser = () => {
    const trimmedNewUser = newUser.trim();

    if (!trimmedNewUser) return;

    if (users.includes(trimmedNewUser)) {
      setError("Användarnamnet är upptaget - försök med ett annat!");
    } else {
      setUsers((prev) => [...prev, trimmedNewUser]);
      setActiveUser(trimmedNewUser);
      setNewUser("");
      setError("");
    }
  };
  {/* Variabel om felmeddelande, annars tom*/}
  const errorMessage = error ? <p className="error-message">{error}</p> : null;

  return (
    <div>
      <h2>Vem är du?</h2>
      <select defaultValue="" onChange={handleSelect}>
        <option value="" disabled>
          Välj användare
        </option>
        {users.map((user, i) => (
          <option key={i} value={user}>
            {user}
          </option>
        ))}
      </select>

      <p>Eller skriv ett nytt namn:</p>
      <input value={newUser} onChange={(e) => setNewUser(e.target.value)} />
      <button onClick={handleAddUser}>Fortsätt</button>
      {errorMessage}
    </div>
  );
}

export default WelcomeScreen;
