import { useParams } from "react-router-dom";

function UserPage({ posts }) {
  const { username } = useParams();
  const userPosts = posts
    .filter((p) => p.author === username)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div>
      <h2>Inlägg av {username}</h2>
      {userPosts.length > 0 ? (
        userPosts.map((post) => (
          <div key={post.id}>
            <p>{post.text}</p>
            <small>{new Date(post.timestamp).toLocaleString()}</small>
          </div>
        ))
      ) : (
         <p>Här var det tomt – {username} har inte skrivit några inlägg än.</p>
      )}
    </div>
  );
}

export default UserPage;
