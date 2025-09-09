import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github } from "lucide-react";

//With className-prop, so new classes can be added
function BlogImage({ src, alt, className = "" }) { 
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={`w-24 h-auto rounded shadow-md object-contain opacity-95 ${className}`}
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

//truncateContent to show introduction text, set false in PostView to show all
export default function BlogPost({ blogs = [], authorFilter = null, backTo = "/", latestPerAuthor = false,  truncateContent = true}) {
  let filteredBlogs = blogs;

  if (latestPerAuthor) {
    filteredBlogs = getLatestPostsPerAuthor(blogs);
  } else if (authorFilter) {
    filteredBlogs = blogs.filter((b) => b.author === authorFilter);
  }

  filteredBlogs.sort(
    (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
  );


  return (
    <div className="p-6 space-y-4">
      {filteredBlogs.map((blog) => (
        <Card key={blog.id} className="w-full hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>
              <Link
                to={`/post/${blog.id}?backTo=${encodeURIComponent(backTo)}`}
                className="hover:underline"
              >
                {blog.title}
              </Link>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex items-start gap-x-4">
            <Link
              to={`/post/${blog.id}?backTo=${encodeURIComponent(backTo)}`}
              className="flex gap-4"
            >
              {blog.image && <BlogImage src={blog.image} alt={blog.title}  className="transition duration-200 transform hover:scale-105 hover:shadow-lg rounded"/>}
              <div className={`text-gray-800 ${truncateContent ? "line-clamp-2" : ""}`}>{blog.content}</div>
            </Link>
          </CardContent>

          <CardFooter className="flex justify-between text-xs">
            <Link
              to={`/${blog.author}`}
              className="flex items-center gap-2 cursor-pointer hover:underline"
            >
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
      ))}
    </div>
  );
}