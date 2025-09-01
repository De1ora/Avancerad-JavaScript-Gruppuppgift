import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BlogPostForm({ activeUser, setPosts }) {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      author: activeUser,
      text,
      timestamp: new Date().toISOString(),
    };

    setPosts((prev) => {
      const updated = [...prev, newPost];
      localStorage.setItem("posts", JSON.stringify(updated));
      return updated;
    });

    navigate(`/user/${activeUser}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Skriv som {activeUser}</h2>
      <textarea
        className="w-full border rounded p-3"
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        placeholder="Vad vill du berätta idag?"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Publicera
      </button>
    </form>
  );
}

export default BlogPostForm;
