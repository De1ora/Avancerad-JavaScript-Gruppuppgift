import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github } from "lucide-react";
import { CreateForm } from "./Form.jsx";
import { useState, useEffect } from "react";
import BlogPost from "./components/BlogPost";
import PostView from "./pages/PostView";

function Home({ blogs }) {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Simpleblog/Superviktiga bloggen</h1>
        <p className="text-gray-600">Welcome to the blog!</p>
        <BlogPost blogs={blogs} latestPerAuthor backTo="/" />
      </CardContent>
    </Card>
  );
}

function Athir({ blogs }) {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Athir blogpost</h1>
        {/*<p className="text-gray-600">Athir test</p>*/}
        <BlogPost blogs={blogs} authorFilter="AthirK" backTo="/AthirK" />
      </CardContent>
    </Card>
  );
}

function Johanna({ blogs }) {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Johanna blogpost</h1>
        {/*<p className="text-gray-600">Johanna test</p>*/}
        <BlogPost blogs={blogs} authorFilter="JoLundan" backTo="/JoLundan" />
      </CardContent>
    </Card>
  );
}

function Lisa({ blogs }) {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Lisa blogpost</h1>
        {/*<p className="text-gray-600">Lisa test</p>*/}
        <BlogPost blogs={blogs} authorFilter="De1ora" backTo="/De1ora" />
      </CardContent>
    </Card>
  );
}

function Magnus({ blogs }) {
  return (
    <Card className="my-6 mx-45">
      <CardContent>
        <h1 className="text-xl font-bold">Magnus blogpost</h1>
         {/*<p className="text-gray-600">Magnus test</p>*/}
        <BlogPost blogs={blogs} authorFilter="rydalund" backTo="/rydalund" />
      </CardContent>
    </Card>
  );
}

{/*function BlogPost() {
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
          </CardHeader>
          
          Test with p to the right -----
          <CardContent className="flex items-start gap-x-4">
             {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                onError={(e) => (e.currentTarget.src = "/no-image.png")}
                className="w-24 h-auto rounded shadow-md object-contain opacity-95"
              />
            )}
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
              {new Date(blog.timeStamp).toLocaleString([], {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}*/}

export default function App() {

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [blogs, setBlogs] = useState([]); {/* For lifting up blogPost state */}

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  }

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

      {showCreateForm && <CreateForm onClose={() => setShowCreateForm(false)}  addBlog={addBlog}/>}

      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="/AthirK" element={<Athir blogs={blogs} />} />
        <Route path="/JoLundan" element={<Johanna blogs={blogs} />} />
        <Route path="/De1ora" element={<Lisa blogs={blogs} />} />
        <Route path="/rydalund" element={<Magnus blogs={blogs} />} />
        <Route path="/post/:id" element={<PostView blogs={blogs} />} /> {/*Route for specific blog post */}
      </Routes>
    </Router>
  );
}
