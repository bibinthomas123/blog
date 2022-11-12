import {React,useState} from "react";
import { Container, Row, Col ,Form,Button } from "react-bootstrap";
import {Link} from "react-router-dom"
import "./login.css"
import axios from "axios"


export default function Signup() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  
  function handleSignup (e){
    axios.post("http://localhost:5000/users",{email,password})
    .then(res=>console.log(res)).catch(err => console.log(err))
    e.preventDefault();
  
  }

  return (
    <Container>
      <Row>
        <Col md={7} className="d-flex align-items-center justify-content-center">
         <Form className="login__form" onSubmit={handleSignup}>
          <h1 className="text-center">Signup</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className="py-4">
                <p>Already have a account ? <Link to="/login">Login </Link>

                </p>
            </div>
          </Form>
        </Col>

        <Col md={5} className="login_bg--container"></Col>
      </Row>
    </Container>
  );
}
