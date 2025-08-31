import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Grommet } from "grommet";
import { customLightTheme, customDarkTheme } from "./components/theme";

import UserPanel from "./components/UserPanel";
import HomePage from "./components/HomePage";
import UserPage from "./components/UserPage";
import BlogPostForm from "./components/BlogPostForm";
import WelcomeScreen from "./components/WelcomeScreen";
import SupportPage from "./components/SupportPage";


function App() {
  const [activeUser, setActiveUser] = useState(() => {
    {/* undefined används för komponen med uppmaning om att logga in vid första användning, samt för att logga ut anv. */}
    return localStorage.getItem("activeUser") || undefined;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : ["Athir", "Johanna", "Lisa", "Magnus"];
  });

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [];
  });

  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });


  useEffect(() => {
    if (activeUser) {
      localStorage.setItem("activeUser", activeUser);
    }
  }, [activeUser]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

 return (
   <Grommet theme={themeMode === "light" ? customLightTheme : customDarkTheme} full>
      {!activeUser ? (
        <WelcomeScreen
          users={users}
          setActiveUser={setActiveUser}
          setUsers={setUsers}
        />
      ) : (
        <>
          <UserPanel
            activeUser={activeUser}
            setActiveUser={setActiveUser}
            users={users}
            toggleTheme={toggleTheme}
            themeMode={themeMode}
          />
          <Routes>
            <Route path="/" element={<HomePage posts={posts} users={users} />} />
            <Route path="/user/:username" element={<UserPage posts={posts} />} />
            <Route
              path="/new"
              element={
                activeUser ? (
                  <BlogPostForm activeUser={activeUser} setPosts={setPosts} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </>
      )}
    </Grommet>
  );
}

export default App;