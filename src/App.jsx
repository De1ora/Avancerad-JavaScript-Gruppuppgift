import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { Card, CardContent } from "@/components/ui/card";
import { CreateForm } from "./Form.jsx";
import { useState, useEffect } from "react";
import BlogPost from "./components/BlogPost";
import PostView from "./pages/PostView";

const users = [
  { id: "AthirK", displayName: "Athir" },
  { id: "JoLundan", displayName: "Johanna" },
  { id: "De1ora", displayName: "Lisa" },
  { id: "rydalund", displayName: "Magnus" },
];

function UserBlog({ user, displayName, blogs }) {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-x1 font-bold">{displayName} blogpost</h1>
        <BlogPost blogs={blogs} authorFilter={user} backTo={`/${user}`} />
      </CardContent>
    </Card>
  );
}

function Home({ blogs }) {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Super Important Blog</h1>
        <p className="text-gray-600">Welcome to the blog!</p>
        <BlogPost blogs={blogs} latestPerAuthor backTo="/" />
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [blogs, setBlogs] = useState([]);
  {
    /* For lifting up blogPost state */
  }

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) setBlogs(JSON.parse(stored));
  }, []);

  const addBlog = (newBlog) => {
    const updated = [...blogs, newBlog];
    setBlogs(updated);
    localStorage.setItem("blogs", JSON.stringify(updated));
  };

  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-blue-500 justify-between">
        <div>
          <Button
            asChild
            variant="link"
            className="text-white hover:text-black-500"
          >
            <Link to="/">Home</Link>
          </Button>

          {users.map((user) => (
            <Button
              key={user.id}
              asChild
              variant="link"
              className="text-white hover:text-black-500"
            >
              <Link to={`/${user.id}`}>{user.displayName}</Link>
            </Button>
          ))}
        </div>

        <div>
          <Button
            variant="outline"
            onClick={toggleCreateForm}
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            {showCreateForm ? "Close Form" : "Add Post"}
          </Button>
        </div>
      </nav>

      {showCreateForm && (
        <CreateForm
          onClose={() => setShowCreateForm(false)}
          addBlog={addBlog}
        />
      )}

      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />

        {users.map((user) => (
          <Route
            key={user.id}
            path={`/${user.id}`}
            element={
              <UserBlog
                user={user.id}
                displayName={user.displayName}
                blogs={blogs}
              />
            }
          />
        ))}

        <Route path="/post/:id" element={<PostView />} />
      </Routes>
    </Router>
  );
}