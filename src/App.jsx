import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github } from "lucide-react";
import { CreateForm } from "./Form.jsx";
import { useState, useEffect } from "react";

function Home() {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Simpleblog/Superviktiga bloggen</h1>
        <p className="text-gray-600">Welcome to the blog!</p>
        <BlogPost />
      </CardContent>
    </Card>
  );
}

function Athir() {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Athir blogpost</h1>
        <p className="text-gray-600">Athir test</p>
      </CardContent>
    </Card>
  );
}

function Johanna() {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Johanna blogpost</h1>
        <p className="text-gray-600">Johanna test</p>
      </CardContent>
    </Card>
  );
}

function Lisa() {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Lisa blogpost</h1>
        <p className="text-gray-600">Lisa test</p>
      </CardContent>
    </Card>
  );
}

function Magnus() {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Magnus blogpost</h1>
        <p className="text-gray-600">Magnus test</p>
      </CardContent>
    </Card>
  );
}

function BlogPost() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("blogs")
    if (stored) setBlogs(JSON.parse(stored));
  }, []);

  return (
    <div className="p-6 space-y-4">
      {blogs.map((blog, index) => (
        <Card key={index} className="w-full">

          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
            <CardDescription>{blog.image}</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-gray-800">{blog.content}</p>
          </CardContent>

          <CardFooter className="flex justify-between text-xs">

            <div className="flex item-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={`https://github.com/${blog.author}.png`} alt={blog.author} />
                <AvatarFallback>
                  <Github className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <p>
                {blog.author}
              </p>
            </div>

            <p>
              {new Date(blog.timeStamp).toLocaleString()}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default function App() {

  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  }

  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-50 border-b justify-between">
        <div>
          <Button asChild variant="link" className="hover:text-blue-600">
            <Link to="/">Home</Link>
          </Button>
          <Button asChild variant="link" className="hover:text-blue-600">
            <Link to="/AthirK">Athir</Link>
          </Button>
          <Button asChild variant="link" className="hover:text-blue-600">
            <Link to="/JoLundan">Johanna</Link>
          </Button>
          <Button asChild variant="link" className="hover:text-blue-600">
            <Link to="/De1ora">Lisa</Link>
          </Button>
          <Button asChild variant="link" className="hover:text-blue-600">
            <Link to="/rydalund">Magnus</Link>
          </Button>
        </div>
        <div>
          <Button variant="outline" onClick={toggleCreateForm} className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
            {showCreateForm ? "Close Form" : "Add Post"}
          </Button>
        </div>
      </nav>

      {showCreateForm && <CreateForm onClose={() => setShowCreateForm(false)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AthirK" element={<Athir />} />
        <Route path="/JoLundan" element={<Johanna />} />
        <Route path="/De1ora" element={<Lisa />} />
        <Route path="/rydalund" element={<Magnus />} />
      </Routes>
    </Router>
  );
}
