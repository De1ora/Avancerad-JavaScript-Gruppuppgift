function HomePage({ posts, users }) {
  const latestPosts = users.map((user) => {
    const userPosts = posts
      .filter((post) => post.author === user)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return userPosts[0];
  }).filter(Boolean);

   return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Senaste inläggen från varje användare</h2>
      {latestPosts.length > 0 ? (
        latestPosts.map((post) => (
          <div key={post.id} className="bg-white shadow p-4 rounded">
            <h3 className="font-semibold text-lg">{post.author}</h3>
            <p className="text-gray-800">{post.text}</p>
            <small className="text-gray-500">
              {new Date(post.timestamp).toLocaleString()}
            </small>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Inga inlägg ännu.</p>
      )}
    </div>
  );
}

export default HomePage;
