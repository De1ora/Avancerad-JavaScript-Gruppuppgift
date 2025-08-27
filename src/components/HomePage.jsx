function HomePage({ posts, users }) {
  const latestPosts = users.map((user) => {
    const userPosts = posts
      .filter((post) => post.author === user)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return userPosts[0];
  }).filter(Boolean);

  return (
    <div>
      <h2>Senaste inlägg från varje användare</h2>
      {latestPosts.length > 0 ? (
        latestPosts.map((post) => (
          <div key={post.id}>
            <h3>{post.author}</h3>
            <p>{post.text}</p>
            <small>{new Date(post.timestamp).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>Inga inlägg ännu.</p>
      )}
    </div>
  );
}

export default HomePage;
