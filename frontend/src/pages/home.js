import React, { useEffect, useState } from 'react'
import Header from "../components/header/header"
import Posts from "../components/posts/posts"
import Sidebar from "../components/sidebar/sidebar"
import {Row,Col, Container} from "react-bootstrap"
import Axios from 'axios'

export default function Home() {
  const [posts, setPosts] = useState([]);
  // const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await Axios.get("/posts");
      setPosts(res.data)
      console.log(res)
    };
    fetchPosts();
  }, []);
  return (
   <>
   <Header/>
   <div className="home">
   <Container>
   <Row className='py-5'>
        <Col md={9}>  <Posts posts={posts} /></Col>
        <Col md={3}> <Sidebar /></Col>
      </Row>
   </Container>
   </div>
   
   
   
   </>
  )
}
