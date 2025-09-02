import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function Home() {
  return (
    <Card className="m-6">
      <CardContent>
        <h1 className="text-xl font-bold">Home</h1>
        <p className="text-gray-600">Welcome to the blog!</p>
        <BlogPostExample />
      </CardContent>
    </Card>
  );
}

function Athir() {
  return (
    <Card className="m-6">
      <CardContent>
        <h1 className="text-xl font-bold">Athir blogpost</h1>
        <p className="text-gray-600">Athir test</p>
      </CardContent>
    </Card>
  );
}

function Johanna() {
  return (
    <Card className="m-6">
      <CardContent>
        <h1 className="text-xl font-bold">Johanna blogpost</h1>
        <p className="text-gray-600">Johanna test</p>
      </CardContent>
    </Card>
  );
}

function Lisa() {
  return (
    <Card className="m-6">
      <CardContent>
        <h1 className="text-xl font-bold">Lisa blogpost</h1>
        <p className="text-gray-600">Lisa test</p>
      </CardContent>
    </Card>
  );
}

function Magnus() {
  return (
    <Card className="m-6">
      <CardContent>
        <h1 className="text-xl font-bold">Magnus blogpost</h1>
        <p className="text-gray-600">Magnus test</p>
      </CardContent>
    </Card>
  );
}

const blogPostsExample = [
  {
    author: "Athir",
    date: "2025-09-02",
    content: "Athir's first blog post."
  },
  {
    author: "Johanna",
    date: "2025-09-01",
    content: "Johanna's first blog post."
  },
  {
    author: "Lisa",
    date: "2025-08-30",
    content: "Lisa's first blog post."
  },
  {
    author: "Magnus",
    date: "2025-09-02",
    content: "Magnus's first blog post."
  }
];

function BlogPostExample() {
  return (
    <div className="p-6 space-y-4">
      {blogPostsExample.map((post, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle>{post.author}</CardTitle>
            <CardDescription>{post.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800">{post.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-50 border-b">
        <Button asChild variant="outline">
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/Athir">Athir</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/Johanna">Johanna</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/Lisa">Lisa</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/Magnus">Magnus</Link>
        </Button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Athir" element={<Athir />} />
        <Route path="/Johanna" element={<Johanna />} />
        <Route path="/Lisa" element={<Lisa />} />
        <Route path="/Magnus" element={<Magnus />} />
      </Routes>
    </Router>
  );
}
