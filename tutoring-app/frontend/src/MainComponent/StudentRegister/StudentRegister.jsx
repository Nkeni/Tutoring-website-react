import React, { useRef } from "react";
import "./StudentRegister.scss";
import { useContext } from "react";
import { Context } from "../../Context.jsx";
import {
  Form,
  FormControl,
  Button,
  ListGroup,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const { setErrors } = useContext(Context);
  const emailInput = useRef();
  const nameInput = useRef();
  const passwordInput = useRef();
  const fileInput = useRef();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", emailInput.current.value);
    formData.append("full_name", nameInput.current.value);
    formData.append("password", passwordInput.current.value);
    formData.append("selectedFile", fileInput.current.files[0]);

    // const formData = {
    //   email: emailInput.current.value,
    //   full_name: nameInput.current.value,
    //   password: passwordInput.current.value,
    //   selectedFile: fileInput.current.files[0],
    // };

    const config = {
      method: "POST",
      body: formData,
    };

    fetch("http://localhost:3030/api/students/register", config)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            console.log(err);
            setErrors(err);
          });
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        setErrors(err);
        console.log(err);
      });
    emailInput.current.value = "";
    nameInput.current.value = "";
    passwordInput.current.value = "";
    alert("You are registered, Please login");
    navigate("/home");
  };

  return (
    <div>
      <Container>
        <Row className="register">
          <Col sm={6} className="register-form">
            <Form onSubmit={submitHandler} className="the-form">
              <h3>Register yourself here</h3>
              <ListGroup className="input-container">
                <ListGroup.Item variant="success">
                  <FormControl
                    type="file"
                    ref={fileInput}
                    placeholder="profile picture"
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="success">
                  <FormControl type="text" ref={nameInput} placeholder="name" />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="dark">
                  <FormControl
                    type="email"
                    ref={emailInput}
                    placeholder="email"
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="success">
                  <FormControl
                    type="password"
                    ref={passwordInput}
                    placeholder="password"
                  />
                </ListGroup.Item>
              </ListGroup>
              <br />
              <Button type="submit">Register</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentRegister;
