import React from "react";
import { Col, Image, Row } from "react-bootstrap";

class ProductPageImages extends React.Component {
  state = {
    currentCover: this.props.cover
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ currentCover: nextProps.cover });
  }

  changeCurrentCover = cover => {
    this.setState({ currentCover: cover });
  };
  renderSmallImages = images => {
    return images.map(image => {
      return (
        <Col md="12" className="mb-1" key={image}>
          <div onClick={() => this.changeCurrentCover(image)}>
            <a href="#" onClick={event => event.preventDefault()}>
              <Image src={image} thumbnail style={{ height: 70, width: 60 }} />
            </a>
          </div>
        </Col>
      );
    });
  };
  render() {
    const { images } = this.props;
    const imagesComponent = this.renderSmallImages(images);
    const { currentCover } = this.state;
    return (
      <div>
        <Row>
          <Col md="2">
            <Row>{imagesComponent}</Row>
          </Col>

          <Col md="10">
            <img
              alt={currentCover}
              src={currentCover}
              style={{
                height: 400,
                border: "1px solid #dee2e6",
                padding: 10,
                width: "100%"
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductPageImages;
