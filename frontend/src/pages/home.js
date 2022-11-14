import React from 'react'
import Header from "../components/header/header"
import Posts from "../components/posts/posts"
import Sidebar from "../components/sidebar/sidebar"
import {Row,Col, Container} from "react-bootstrap"
// import "./home.css"

export default function Home() {
  return (
   <>
   <Header/>
   <div className="home">
   <Container>
   <Row className='py-5'>
        <Col md={9}>  <Posts /></Col>
        <Col md={3}> <Sidebar /></Col>
      </Row>
   </Container>
   </div>
   
   
   
   </>
  )
}
