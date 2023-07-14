import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Sample carousel data
    const carouselData = [
        {
            id: 1,
            image: '/Landing/ticketpicture.jpg',
            title: 'Promotion 1',
        },
        {
            id: 2,
            image: '/Landing/b.jpg',
            title: 'Promotion 2',
        },
        {
            id: 3,
            image: '/Landing/c.jpg',
            title: 'Promotion 3',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [carouselData.length]);

    return (
        <div className="carousel">
            {carouselData.map((item, index) => (
                <div
                    key={item.id}
                    className={`carousel-item ${index === currentIndex ? 'active' : ''
                        }`}
                >
                    <img src={item.image} alt={item.title} />
                </div>
            ))}
        </div>
    );
};

export default Carousel;