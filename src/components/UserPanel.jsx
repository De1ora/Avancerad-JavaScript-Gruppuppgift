import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

import { Box, Heading, Select, Button } from "grommet";
import { useTheme } from "styled-components";  {/* Behövs för att få ihop det med Grommet och eget tema via js-fil*/}

function UserPanel({ activeUser, setActiveUser, users, toggleTheme, themeMode }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleNewPost = () => {
    if (!activeUser) {
      alert("Du måste välja en användare först!");
    } else {
      navigate("/new");
    }
  };

  return (
    <Box pad="medium" background={
      themeMode === "dark"
      ? theme.global.colors.userPanelBackgroundDark
      : theme.global.colors.userPanelBackgroundLight
    }>
      <Box direction="row" align="center" gap="small" wrap={false}>

        <Box width="20vw" flex={false}>
          <Heading level={2} margin="none" color="black">
            Superviktiga bloggen
          </Heading>
        </Box>

        <Box width="30vw" flex="grow" overflow="auto" pad={{ horizontal: "small" }}>
          <Nav users={users} />
        </Box>

        {/* Höger del, med padding till höger  */}
        <Box direction="row" gap="small" flex={false} align="center" width="40vw" justify="end" pad={{ right: "small" }}>
          <Select
            options={users}
            value={activeUser || ""}
            placeholder="Välj användare"
            onChange={({ option }) => setActiveUser(option)}
          />

          <Button label="Skriv inlägg" onClick={handleNewPost} primary />

          <Button label="Logga ut" onClick={() => setActiveUser(undefined)} />

          <Button
            label={themeMode === "light" ? "Mörkt tema" : "Ljust tema"}
            onClick={toggleTheme}
            secondary
          />
        </Box>
      </Box>
    </Box>
  );
}

export default UserPanel;