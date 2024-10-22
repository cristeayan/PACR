import { useState } from 'react';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    // const [token, setToken] = useState('');  // JWT token

    const handleFileChange = (e) => {
        setMediaFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')

        const formData = new FormData();
        formData.append('content', content);

        // Add media files to formData
        Array.from(mediaFiles).forEach((file, index) => {
            formData.append('media', file);
        });

        try {
            const res = await fetch('http://localhost:8000/api/posts/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the JWT token for authentication
                },
                body: formData,  // Send the formData directly
            });

            if (res.ok) {
                const data = await res.json();
                alert('Post created successfully:', data);
            } else {
                console.error('Failed to create post:', res.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Create a Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Upload Media:</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*, video/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <button type="submit">Create Post</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
