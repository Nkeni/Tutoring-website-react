import "./Home.scss";
import React from "react";
import "./Home.scss";
import { useContext } from "react";
import StudentLogin from "../StudentLogin/StudentLogin.jsx";
import { Context } from "../../Context.jsx";
import Tutors from "../Tutors/Tutors.jsx";
import { Container, Row } from "react-bootstrap";

function Home() {
  const { studentToken } = useContext(Context);
  return (
    <div className="Home">
      {studentToken ? <Tutors /> : <StudentLogin />}
      <Container>
        <Row className="intro">
          <h2>Are you a high level STEM student in East Africa?</h2>
          <p>
            We have good news for you concerning your studies. learn more about
            us and our services. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Optio officia assumenda deleniti obcaecati dicta
            quasi et dolor, nam quos quam sit! Ipsa vel, alias corrupti fuga qui
            blanditiis velit sit beatae architecto voluptate quas quidem
            praesentium quasi aperiam dolorum et atque? Laboriosam omnis
            reiciendis deleniti beatae ad? Excepturi, voluptate assumenda.
          </p>

          <h2>Our mission</h2>
          <p>
            We want to help students understand and pass their exams as well as
            assist them with scholarships application.
          </p>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
