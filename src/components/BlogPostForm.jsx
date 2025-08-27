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
    <form onSubmit={handleSubmit}>
      <h2>Skriv som {activeUser}</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <br />
      <button type="submit">Publicera</button>
    </form>
  );
}

export default BlogPostForm;
