import React, { useState, useEffect, useRef } from 'react';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroImg03 from '../assets/images/hero-img03.jpeg';
import heroImg04 from '../assets/images/hero-img04.jpeg';
import heroVideo from '../assets/images/hero-video01.mp4';
import heroVideo02 from '../assets/images/hero-video02.mp4';
import experienceImg from '../assets/images/experience.png';
import Subtitle from './../shared/Subtitle';
import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../component/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../component/image-gallery/MasonryImagesGallery';
import Testimonials from '../component/Testimonial/Testimonials';

const images = [heroImg, heroImg02, heroImg03, heroImg04];
const videos = [heroVideo, heroVideo02];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leftImageIndex, setLeftImageIndex] = useState(0);
  const [rightImageIndex, setRightImageIndex] = useState(1);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setLeftImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setRightImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <>
      {/*======= hero section start ====*/}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={'Know Before You Go'} />
                </div>
                <h1>Traveling opens the door to creating <span className="highlight">memories</span></h1>
                <p>Whether you're seeking an adventurous trek through the Atlas Mountains, a serene escape in the Sahara Desert, or a cultural journey through the historic cities of Marrakech, Fes, and Casablanca, we have something for everyone.</p>
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box">
                <img src={images[leftImageIndex]} alt="" />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box hero__video-box mt-4">
                <video ref={videoRef} src={videos[currentIndex]} alt="" controls onEnded={handleVideoEnd} />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box mt-5">
                <img src={images[rightImageIndex]} alt="" />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </section>
      {/*======= hero section end ====*/}
      <section>
        <Container>
          <Row>
            <Col l='3'>
              <h5 className="services__subtitle">What We Offer?</h5>
              <h2 className="services__title">Explore Our Services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/*==========featured tour section start =======*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"}>
                <h2 className="featured__tour-title">Our featured tours</h2>
              </Subtitle>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/*==========featured tour section end =======*/}

      {/*==========experience section start =======*/}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="experience__content">
                <Subtitle subtitle={'Experience'} />
                <h2>With our extensive experience,<br /> we will serve you</h2>
                <p>
                  At WanderLust, our passion for Morocco is matched by our expertise in creating unforgettable travel experiences.
                  <br />From the bustling markets of Marrakech to the tranquil sands of the Sahara, we ensure every detail is meticulously planned, allowing you to fully immerse yourself in the magic of Morocco.
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful trip</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>5</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg='6'>
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/*==========experience section end =======*/}
      {/*==========gallery section start =======*/}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Our Gallery'} />
              <h2 className="gallery__title">You can see the beauty of our work from here</h2>
            </Col>
            <Col lg='12'>
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/*==========gallery section end =======*/}

      {/*=========testimonial section start======== */}

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'What Our Clients Say'} />
              <h2 className="testimonial__title">Hear what our clients say</h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/*=========testimonial section end======== */}
    </>
  )
}

export default Home;
