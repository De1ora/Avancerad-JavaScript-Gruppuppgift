import { useState } from "react";
import { Box, Heading, Select, TextInput, Button, Text } from "grommet";

function WelcomeScreen({ users, setActiveUser, setUsers }) {
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState("");

  const handleSelect = ({ option }) => {
    setActiveUser(option);
    setError("");
  };

 const handleAddUser = () => {
    const trimmedNewUser = newUser.trim();

    if (!trimmedNewUser) return;

    if (users.includes(trimmedNewUser)) {
      setError("Användarnamnet är upptaget – försök med ett annat!");
    } else {
      setUsers((prev) => [...prev, trimmedNewUser]);
      setActiveUser(trimmedNewUser);
      setNewUser("");
      setError("");
    }
  };

  {/* Variabel om felmeddelande, annars tom*/}
 const errorMessage = error ? (
    <Text color="status-critical" margin={{ top: "small" }}>
      {error}
    </Text>
  ) : null;

  return (
    <Box fill align="center" justify="center" pad="large" gap="medium"  style={{ maxWidth: 400, margin: "auto" }}>
      <Heading level={2} margin="none">Vem är du?</Heading>

      <Box width="100%">
        <Select
          options={users}
          placeholder="Välj användare"
          onChange={handleSelect}
        />
      </Box>

      <Box width="100%">
        <Text margin={{ vertical: "small" }}>Eller skriv ett nytt namn:</Text>
        <TextInput
          placeholder="Nytt användarnamn"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <Button
          label="Fortsätt"
          onClick={handleAddUser}
          primary
          margin={{ top: "medium" }}
          fill={false}
        />
        {errorMessage}
      </Box>
    </Box>
  );
}

export default WelcomeScreen;
