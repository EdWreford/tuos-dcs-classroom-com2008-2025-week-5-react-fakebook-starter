import { useEffect } from "react";

import { Stack } from "react-bootstrap";
import { isEmpty } from "lodash";

import Post from "./Post.jsx";

const Posts = ({ client, posts }) => {

  useEffect(() => {
    client.getPosts()
  }, []);

  return (
    <>
      <h1>Posts</h1>
      {isEmpty(posts) && (
        <p>No Posts Yet</p>
      )}
      <Stack gap={2}>
        {posts.map(p => (
          <Post key={p.id} post={p}/>
        ))}
      </Stack>
    </>
  )
};

export default Posts;