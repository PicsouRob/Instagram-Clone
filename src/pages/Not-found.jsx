import React, { useEffect } from 'react';

import Header from '../components/headers/Header';

function NotFound() {
    useEffect(() => {
        document.title = 'Not Found';
    }, []);

    return <div class="w-full bg-gray-background mx-auto text-center max-h-screen">
        <Header />
        <div class="grid place-items-center h-full mx-auto gap-y-5 max-w-screen-md pt-24">
            <h3 class="text-xl font-bold">
                This page is not available.
            </h3>
            <p class="text-">
                The link you selected may be broken or the page may have been removed. <a href="/" class="text-blue-medium">Back to Instagram.</a>
            </p>
        </div>
    </div>;
}

export default NotFound;