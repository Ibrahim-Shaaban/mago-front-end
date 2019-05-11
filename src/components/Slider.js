import React from "react";
import { Carousel, Image } from "react-bootstrap";

const Slider = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <Image
            src="https://img.staticbg.com/banggood/os/201904/20190430041303_916.jpg.webp"
            fluid
          />
          <Carousel.Caption variant="light">
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="https://img.staticbg.com/banggood/os/201904/20190430041303_916.jpg.webp"
            fluid
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="https://img.staticbg.com/banggood/os/201904/20190430041303_916.jpg.webp"
            fluid
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
