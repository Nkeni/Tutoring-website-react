import React, { useRef } from "react";
import "./StudentLogin.scss";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import {
  Form,
  FormControl,
  Button,
  ListGroup,
  Col,
  Row,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import pic from "../../images/learn.jpg";

const StudentLogin = () => {
  const { setStudent, setStudentToken } = useContext(Context);
  const emailInput = useRef();
  const passwordInput = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };

    fetch("http://localhost:3030/api/students/login", config)
      .then((res) => {
        if (res.status === 401) {
          throw Error("credential failed");
        }

        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (!result.token) {
          return;
        }
        localStorage.setItem("studentToken", JSON.stringify(result.token));
        localStorage.setItem("student", JSON.stringify(result.student));
        setStudentToken(result.token);
        setStudent(result.student);
      })
      .catch((err) => {
        console.log(err, "coming from catch");
      });
  };

  return (
    <div>
      <Row>
        <Col sm={6} className="home-bg">
          <img src={pic} alt="background pic" />
        </Col>
        <Col sm={6} className="form">
          <h3>Login please!</h3>
          <Form onSubmit={submitHandler}>
            <ListGroup className="input-container">
              <ListGroup.Item variant="dark">
                <FormControl
                  type="email"
                  placeholder="Your email..."
                  ref={emailInput}
                />
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="input-container">
              <ListGroup.Item variant="success">
                <FormControl
                  type="password"
                  placeholder="password"
                  ref={passwordInput}
                />
              </ListGroup.Item>
            </ListGroup>
            <Button variant="outline-success" type="submit">
              Login
            </Button>
          </Form>

          <p>
            New here? Please <NavLink to="/register">Register</NavLink>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default StudentLogin;
