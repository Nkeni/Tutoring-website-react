import React from "react";
import "./About.scss";
import { Container, Row, Card, CardGroup } from "react-bootstrap";
import Agatha from "../../images/Ag.jpg";
import Bob from "../../images/Bob.jpg";

function About() {
  return (
    <div className="About">
      <Card>
        <Card.Body className="card-title">
          <h2>About us</h2>
        </Card.Body>
      </Card>
      <Container>
        <Row className="About-row">
          <p>
            We are the Omega Tutors. We provide tutoring services online and
            physically in Uganda Omega Tutors centre. We are focusing on
            Mathematics, Physics and Chemistry for Advanced level (East African
            Curriculum). We also post scholarships and tips to pass IELTS as
            bonus. Our tutors are very experienced and friendly. Register and
            book your classes with us.
          </p>

          <h3>Founders</h3>
          <CardGroup>
            <Card className="founders">
              <img src={Bob} alt="founder1" />

              <Card.Body>
                <Card.Title>Founder</Card.Title>
                <Card.Text>Bob Kyeyune</Card.Text>
                <Card.Text>Nanoscientist, PhD</Card.Text>
              </Card.Body>
            </Card>
            <Card className="founders">
              <img src={Agatha} alt="founder2" />

              <Card.Body>
                <Card.Title>Co-Founder</Card.Title>
                <Card.Text>Agatha A Msola</Card.Text>
                <Card.Text>Full stack web developer</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Row>
      </Container>
    </div>
  );
}

export default About;
