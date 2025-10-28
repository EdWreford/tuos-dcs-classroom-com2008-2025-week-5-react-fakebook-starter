import { Container } from "react-bootstrap";
import RegisterForm from "./RegisterForm.jsx";
import { useState } from 'react';
import axios from "axios";

const App = () => {

  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);

  const BASE_URL = "http://localhost:8080"

  const authorisedRequest = (url, method, data={}) => axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  const client = {
    getPosts: () => authorisedRequest("/posts", "GET")
      .then(({ data }) => { setPosts(data) }),
    createPost: (data) => authorisedRequest("/posts", "POST", data)
      .then(() => { client.getPosts() })
  };

  return (
    <Container>
      <RegisterForm setToken={setToken}/>
      {token !== "" && (
        <>
          <NewPostForm client={client}/>
          <Posts posts={posts} client={client}/>
        </>
      )}
    </Container>
  );
}

export default App;
