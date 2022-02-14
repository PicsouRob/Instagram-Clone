import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Slider from "react-slick";

import Story from './Story';

function Stories() {
    const [stories, setStories] = useState([]);
    const [index, setIndex] = useState(0);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 4,
        prevArrow: <Prev index={index} />,
        nextArrow: <Next />,
        beforeChange: (current, next) => setIndex(current),
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 6,
                    dots: false,
                    infinite: false,
                    slidesToScroll: 6
                }
            }
        ]
    };

    useEffect(() => {
        const data = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(), id: i
        }));

        setStories(data);
    }, []);

    return (
        <div class="bg-white rounded-sm py-5 mb-5 border border-gray-primary overflow-hidden">
            {stories?.length > 0 ? (
                <div class="relative">
                    <Slider {...settings}>
                        {stories.map((story, index) => (
                            <Story key={index} username={story.username}
                                img={story.avatar}
                            />
                        ))}
                    </Slider>
                </div>
            ) : (
                <div class="">

                </div>
            )}
        </div>
    )
}

const Prev = (props) => {
    const { onClick, index } = props;

    return (
        <div
            class={`${index === 0 ? "hidden" : "block"} absolute left-2 top-1/2 -translate-y-1/2 z-30 block bg-white rounded-full shadow-lg h-6 w-6 cursor-pointer`}
            onClick={onClick}
        >
            <div class="grid place-items-center w-full h-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </div>
        </div>
    );

}

const Next = (props) => {
    const { style, onClick } = props;

    return (
        <div
            class="absolute right-2 top-1/2 -translate-y-1/2 z-30 block bg-white rounded-full shadow-lg w-6 h-6 cursor-pointer"
            style={{ ...style }}
            onClick={onClick}
        >
            <div class="grid place-items-center w-full h-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );

}

export default Stories;