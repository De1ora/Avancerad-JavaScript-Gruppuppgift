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
    <header>
      <h2>Bloggen</h2>

      <Nav users={users} />

      <select value={activeUser || ""} onChange={(e) => setActiveUser(e.target.value)}>
        <option value="">Välj användare</option>
        {users.map((user, i) => (
          <option key={i} value={user}>{user}</option>
        ))}
      </select>

      <button onClick={handleNewPost}>Skriv inlägg</button>
      <button onClick={() => setActiveUser(undefined)}>Logga ut</button>
    </header>
  );
}

export default UserPanel;