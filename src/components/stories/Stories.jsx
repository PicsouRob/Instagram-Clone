import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

import Story from './Story';

function Stories() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const data = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(), id: i
        }));

        setStories(data);
    }, []);

    return (
        <div class="bg-white rounded-sm px-3 py-4 mb-7 border border-gray-primary overflow-hidden">
            {stories?.length > 0 ? (
                <div class="flex items-center gap-x-4">
                    {stories.map((story, index) => (
                        <Story key={index} username={story.username}
                            img={story.avatar}
                        />
                    ))}
                </div>
            ) : (
                <div class="">

                </div>
            )}
        </div>
    )
}

export default Stories;