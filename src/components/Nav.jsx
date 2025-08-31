import { Link } from "react-router-dom";
import { Box, Anchor } from "grommet";

function Nav({ users }) {
return (
    <Box
      as="nav"
      direction="row"
      gap="medium"
      pad={{ vertical: "small" }}
      wrap={true} // så länkarna kan brytas på mindre skärm
    >
      <Anchor as={Link} to="/" label="Hem" />
      {users.map((user, i) => (
        <Anchor key={i} as={Link} to={`/user/${user}`} label={user} />
      ))}
      <Anchor as={Link} to="/support" label="Support" />
    </Box>
  );
}

export default Nav;