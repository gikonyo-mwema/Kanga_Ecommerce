import React, { useState } from 'react';

function ImageUpload() {
    const [image, setImage] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('/api/upload', {  // Updated the upload endpoint to match backend
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setUploadedUrl(data.url);  // Store the uploaded image URL
            console.log(data.url);  // URL of the uploaded image
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleChange} />
            <button type="submit">Upload Image</button>
            {uploadedUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={uploadedUrl} alt="Uploaded" width="200" />
                </div>
            )}
        </form>
    );
}

export default ImageUpload;

