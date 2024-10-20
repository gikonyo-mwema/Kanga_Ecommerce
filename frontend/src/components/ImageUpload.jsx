import React, { useState } from 'react';

function ImageUpload() {
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        console.log(data.url); // This is the URL of the uploaded image
        // Here you can save the URL in your state or database as needed
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleChange} />
            <button type="submit">Upload Image</button>
        </form>
    );
}

export default ImageUpload;
