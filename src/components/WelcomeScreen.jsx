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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-4">
      <h2 className="text-4xl font-semibold">Vem är du?</h2>

      <select
        defaultValue=""
        onChange={handleSelect}
        className="border rounded px-4 py-2"
      >
        <option value="" disabled>
          Välj användare
        </option>
        {users.map((user, i) => (
          <option key={i} value={user}>
            {user}
          </option>
        ))}
      </select>

      <p className="text-sm text-gray-600">Eller skriv ett nytt namn:</p>
      <input
        className="border rounded px-4 py-2"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button
        onClick={handleAddUser}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Fortsätt
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default WelcomeScreen;
