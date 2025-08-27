import { Link } from "react-router-dom";

function Nav({ users }) {
  return (
    <nav>
      <Link to="/">Hem</Link>
      {users.map((user, i) => (
        <Link key={i} to={`/user/${user}`}>
          {user}
        </Link>
      ))}
    </nav>
  );
}

export default Nav;