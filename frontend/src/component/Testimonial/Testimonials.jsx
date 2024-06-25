import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    };

    return (
        <Slider {...settings}>
            <div className="testimonial py-4 px-3">
                <p>"WanderLust provided an unforgettable experience in Morocco! The tour was well-organized, and the guides were incredibly knowledgeable. Highly recommended!"</p>
                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={ava01} className="w-25 h-25 rounded-2" alt="" />
                    <div>
                        <h6 className="mb-0 mt-3">John Doe</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testimonial py-4 px-3">
                <p>"From the Sahara Desert to the Atlas Mountains, WanderLust showed us the best of Morocco. The personalized service and attention to detail made all the difference."</p>
                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
                    <div>
                        <h6 className="mb-0 mt-3">Lia Franklin</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testimonial py-4 px-3">
                <p>"The cultural tour through Marrakech, Fes, and Casablanca was a dream come true. WanderLust made everything so easy and enjoyable. I can't wait to travel with them again!"</p>
                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={ava03} className="w-25 h-25 rounded-2" alt="" />
                    <div>
                        <h6 className="mb-0 mt-3">Sarah Williams</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testimonial py-4 px-3">
                <p>"Exploring Morocco with WanderLust was an incredible adventure. The guides were fantastic, and the itinerary was perfect. I highly recommend them for any trip to Morocco."</p>
                <div className="d-flex align-items-center gap-4 mt-3">
                    <img src={ava02} className="w-25 h-25 rounded-2" alt="" />
                    <div>
                        <h6 className="mb-0 mt-3">Mark Johnson</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default Testimonials;
