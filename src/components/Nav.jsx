import { Link } from "react-router-dom";

function Nav({ users }) {
  return (
    <nav className="flex gap-8 flex-wrap">
      <Link to="/" className="text-blue-600 hover:underline">Hem</Link>
      {users.map((user, i) => (
        <Link
          key={i}
          to={`/user/${user}`}
          className="text-blue-600 hover:underline"
        >
          {user}
        </Link>
      ))}
      <Link to="/support" className="text-blue-600 hover:underline">Support</Link>
    </nav>
  );
}

export default Nav;