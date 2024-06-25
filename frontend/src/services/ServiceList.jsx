import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Get accurate and up-to-date weather forecasts to plan your travel itinerary effectively."
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Explore the best destinations with our experienced and knowledgeable tour guides."
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Personalize your travel experience with tailored packages that meet your needs and preferences."
  },
];

const ServiceList = () => {
  return (
    <>
      {
        servicesData.map((item, index) => (
          <Col lg='3' md='6' sm='12' className="mb-4" key={index}>
            <ServiceCard item={item}></ServiceCard>
          </Col>
        ))
      }
    </>
  );
}

export default ServiceList;
