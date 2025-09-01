import { useParams } from "react-router-dom";

function UserPage({ posts }) {
  const { username } = useParams();
  const userPosts = posts
    .filter((p) => p.author === username)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

 return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center">
        Inlägg av {username}
      </h2>

      {userPosts.length > 0 ? (
        userPosts.map((post) => (
          <div key={post.id} className="bg-white shadow p-4 rounded space-y-2">
            <p className="text-gray-800 whitespace-pre-wrap">{post.text}</p>
            <small className="text-gray-500 block">
              {new Date(post.timestamp).toLocaleString()}
            </small>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">
          Här var det tomt – {username} har inte skrivit några inlägg än.
        </p>
      )}
    </div>
  );
}

export default UserPage;
