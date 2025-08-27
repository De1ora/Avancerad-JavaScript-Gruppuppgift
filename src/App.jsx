import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPanel from "./components/UserPanel";
import HomePage from "./components/HomePage";
import UserPage from "./components/UserPage";
import BlogPostForm from "./components/BlogPostForm";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  const [activeUser, setActiveUser] = useState(() => {
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

  return (
    <>
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
          />
          <Routes>
            <Route path="/" element={<HomePage posts={posts} users={users} />} />
            <Route path="/user/:username" element={<UserPage posts={posts} />} />
            <Route
              path="/new"
              element={
                activeUser ? (
                  <BlogPostForm
                    activeUser={activeUser}
                    setPosts={setPosts}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;