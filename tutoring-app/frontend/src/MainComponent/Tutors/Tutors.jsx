import React from "react";
import "./Tutors.scss";
import { useContext, useEffect } from "react";
import { Context } from "../../Context.jsx";
import { Col, Row, Button } from "react-bootstrap";

function Tutors() {
  const {
    student,
    setStudentToken,
    setStudent,
    teachers,
    setTeachers,
    studentToken,
  } = useContext(Context);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    };
    fetch("http://localhost:3030/api/teachers/allTeachers", config)
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => console.log(err));
          return localStorage.removeItem("user");
        }

        return res.json();
      })
      .then((result) => {
        console.log(result.reverse());
        //^ new teachers show at the top
        setTeachers(result);
      });
  }, []);

  //^ Student logout handler
  const logoutHandler = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("student");
    setStudentToken(null);
    setStudent(null);
  };

  return (
    <div>
      <Row className="tutors">
        <Col sm={4} className="dashboard">
          <img
            src={`http://localhost:3030/api/students/profile/${student.profile.filename}`}
            alt="profile-pic"
          />
          <Button className="edit-profile" variant="outline-dark">
            Edit profile picture
          </Button>
          <p>
            Logged in as <span>{student.full_name}</span>
          </p>
          <p>My classes</p>
          <Button variant="outline-danger" onClick={logoutHandler}>
            Logout
          </Button>
        </Col>
        <Col sm={8} className="tutors-info">
          <h3>Hallo {student.full_name}, find and book your tutor here</h3>
          <hr />
          <ul>
            {teachers &&
              teachers.map((teacher) => (
                <li key={teacher._id}>
                  <p>Name : {teacher.full_name}</p>
                  <p>Subject: {teacher.subject} </p>
                  <Button variant="outline-success">Book</Button>
                  <hr />
                </li>
              ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default Tutors;
