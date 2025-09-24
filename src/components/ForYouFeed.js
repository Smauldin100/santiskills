import React, { useEffect, useState } from 'react';
import ForYouPost from './ForYouPost';

const ForYouFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts and users from JSONPlaceholder using async/await
    async function loadFeed() {
      try {
        const postsRes = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=10'
        );
        const postsData = await postsRes.json();

        const usersRes = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const usersData = await usersRes.json();

        // Map posts to users and add random images
        const postsWithMedia = postsData.map((post, i) => {
          const user =
            usersData.find(u => u.id === post.userId) ||
            usersData[i % usersData.length];

          return {
            id: post.id,
            username: user.username,
            avatar: `https://randomuser.me/api/portraits/men/${(user.id % 50) + 1}.jpg`,
            image: `https://picsum.photos/seed/${post.id}/600/400`,
            caption: post.title,
            likes: Math.floor(Math.random() * 200) + 10,
            comments: [
              { user: 'demo', text: 'Nice post!' },
              { user: 'guest', text: 'Love this!' },
            ],
          };
        });

        setPosts(postsWithMedia);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  if (loading) return <div>Loading feed...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      {posts.map(post => (
        <ForYouPost key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ForYouFeed;
