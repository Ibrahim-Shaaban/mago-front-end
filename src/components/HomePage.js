import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "./Slider";
import HomeCategories from "./HomeCategories";

const HomePage = () => {
  return (
    <div>
      <Container className="mt-2">
        <Row className="justify-content-md-center">
          <Col md="8">
            <Slider />
          </Col>
        </Row>
        <Row className="mt-2 justify-content-md-center">
          <HomeCategories />
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
