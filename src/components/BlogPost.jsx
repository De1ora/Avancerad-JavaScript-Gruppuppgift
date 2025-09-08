import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github } from "lucide-react";

function BlogImage({ src, alt }) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className="w-24 h-auto rounded shadow-md object-contain opacity-95"
    />
  );
}

function getLatestPostsPerAuthor(blogs) {
  const latest = Object.values(
    blogs.reduce((acc, blog) => {
      if (!acc[blog.author] || new Date(blog.timeStamp) > new Date(acc[blog.author].timeStamp)) {
        acc[blog.author] = blog;
      }
      return acc;
    }, {})
  );

  return latest.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
}


export default function BlogPost({ blogs = [], authorFilter = null, backTo = "/", latestPerAuthor = false }) {
  //const [allBlogs, setAllBlogs] = useState([]);
  //const [blogs, setBlogs] = useState([]);

  //useEffect(() => {
    //const stored = localStorage.getItem("blogs");
    //if (stored) setAllBlogs(JSON.parse(stored));
  //}, []);

  //useEffect(() => {
  let filteredBlogs = blogs;

  if (latestPerAuthor) {
    filteredBlogs = getLatestPostsPerAuthor(blogs);
  } else if (authorFilter) {
    filteredBlogs = blogs.filter((b) => b.author === authorFilter);
  }

  filteredBlogs.sort(
    (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
  );


    //setBlogs(filteredBlogs);
  //}, [allBlogs, authorFilter, latestPerAuthor]);

  return (
    <div className="p-6 space-y-4">
      {filteredBlogs.map((blog) => (
        <Link
          key={blog.id}
          to={`/post/${blog.id}?backTo=${encodeURIComponent(backTo)}`}
          className="block"
        >
          <Card className="w-full hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start gap-x-4">
              {blog.image && <BlogImage src={blog.image} alt={blog.title} />}
              <p className="text-gray-800">{blog.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-xs">
              <Link to={`/${blog.author}`} className="flex items-center gap-2 cursor-pointer hover:underline">
                <Avatar className="w-6 h-6">
                <AvatarImage src={`https://github.com/${blog.author}.png`} alt={blog.author} />
                  <AvatarFallback>
                    <Github className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <p>{blog.author}</p>
              </Link>
              <p>
                {new Date(blog.timeStamp).toLocaleString([], {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}