import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

export function BlogPostExample() {
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