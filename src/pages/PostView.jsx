import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Github } from "lucide-react";

export default function PostView() {
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const backTo = queryParams.get("backTo") || "/";

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      const blogs = JSON.parse(stored);
      const found = blogs.find((b) => b.id === id);
      setPost(found);
    }
  }, [id]);

  return (
  <div className="p-6 max-w-2xl mx-auto">
    <Link to={backTo} className="text-blue-500 hover:underline text-sm mb-4 block">
      ← Go back
    </Link>

    {!post ? (
      <p>Post not found</p>
    ) : (
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>

        <CardContent>
          {post.image && (
            <div className="mb-6">
              <img
                src={post.image}
                alt={post.title}
                onError={(e) => (e.currentTarget.style.display = "none")}
                className="rounded md max-h-96 w-full object-contain"
              />
            </div>
          )}
          <p className="text-gray-800">{post.content}</p>
        </CardContent>

        <CardFooter className="flex justify-between text-xs text-gray-600">
          <Link to={`/${post.author}`} className="flex items-center gap-2 cursor-pointer hover:underline">
            <Avatar className="w-6 h-6">
              <AvatarImage src={`https://github.com/${post.author}.png`} alt={post.author} />
              <AvatarFallback>
                <Github className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <p>{post.author}</p>
          </Link>
          <p>
            {new Date(post.timeStamp).toLocaleString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </CardFooter>
      </Card>
    )}
  </div>
);
}