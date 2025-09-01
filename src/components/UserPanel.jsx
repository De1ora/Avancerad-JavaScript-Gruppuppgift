import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

function UserPanel({ activeUser, setActiveUser, users }) {
  const navigate = useNavigate();

  const handleNewPost = () => {
    if (!activeUser) {
      alert("Du måste välja en användare först!");
    } else {
      navigate("/new");
    }
  };

  return (
    <div className="px-4"> {/* Lägg till denna wrapper med sidomarginal */}
      <header className="bg-white shadow p-4 flex flex-wrap items-center justify-between gap-4">
        <h1 
          className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" 
          style={{ 
            fontFamily: "'Georgia', serif",
            fontWeight: 700,
            letterSpacing: "-0.5px"
          }}
        >
        Superviktiga bloggen
        </h1>

        <Nav users={users} />

        <div className="flex gap-2 items-center">
          <select
            value={activeUser || ""}
            onChange={(e) => setActiveUser(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="" disabled>Välj användare</option>
            {users.map((user, i) => (
              <option key={i} value={user}>{user}</option>
            ))}
          </select>

          <button
            onClick={handleNewPost}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Skriv inlägg
          </button>

          <button
            onClick={() => setActiveUser(undefined)}
            className="text-sm text-gray-600 hover:underline"
          >
            Logga ut
          </button>
        </div>
      </header>
    </div>
  );
}

export default UserPanel;