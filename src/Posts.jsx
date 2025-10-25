import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";

import Post from "./Post.jsx";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(({ data }) => setPosts(data))
  }, []);

  return (
    <Stack gap={2}>
      {posts.map(p => (
        <Post key={p.id} post={p} />
      ))}
    </Stack>
  )
};

export default Posts;