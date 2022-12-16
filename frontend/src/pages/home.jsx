import React, { useEffect, useState } from 'react'
import Header from "../components/header/header"
import Posts from "../components/posts/posts"
import Sidebar from "../components/sidebar/sidebar"
import {Row,Col, Container} from "react-bootstrap"
import Axios from 'axios'
import { useLocation } from 'react-router'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await Axios.get("/posts"+search);
      setPosts(res.data)
      console.log(res)
    };
    fetchPosts();
  }, [search]);
  return (
   <>
   <Header/>
   <div className="home">
   <Container>
   <Row className='py-5'>
        <Col md={8}>  <Posts posts={posts} /></Col>
        <Col md={4}> <Sidebar /></Col>
      </Row>
   </Container>
   </div>
   
   
   
   </>
  )
}
