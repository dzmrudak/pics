import React, { useEffect, useState } from 'react';
import reportWebVitals from '../reportWebVitals';
import axios from "axios";

const MainPage = () => {
    const [pictures, setPictures] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedPicture, setSearchedPicture] = useState(null);
    const [error, setError] = useState('');

    const fetchRandomPictures = async () => {
        try {
            const responses = await Promise.all(
                Array.from({ length: 9 }, () =>
                    axios.get('/random-picture', { responseType: 'blob' })
                )
            );

            const newPictures = responses.map((response) => {
                return URL.createObjectURL(response.data);
            });

            setPictures(newPictures);
        } catch (error) {
            console.error(error);
            setError('An error occurred while fetching random pictures.');
        }
    };

    useEffect(() => {
        const handleWebVitals = (metric) => {
            console.log(metric); // Customize how you report the metrics
        };

        reportWebVitals(handleWebVitals);
    }, []);

    useEffect(() => {
        fetchRandomPictures();
        console.log("useEffect called");
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (searchQuery) {
            const formData = new FormData();
            formData.append('pictureName', searchQuery.trim());

            try {
                const response = await axios.post('/picture', formData, {
                    responseType: 'blob',
                });
                const picture = URL.createObjectURL(response.data);

                setSearchedPicture(picture);
                setError('');
            } catch (error) {
                if (error.response) {
                    setError(error.response.statusText);
                } else {
                    console.error(error);
                    setError('An error occurred while processing your request.');
                }
                setSearchedPicture(null);
            }
        }
    };

    return (
        <>
            <h1 >Random Pictures Grid</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search-input">Search Picture: </label>
                <input
                    type="text"
                    placeholder="Enter a picture name"
                    id="search-input"
                    name="pictureName"
                    value={searchQuery.slice(0, 10)}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button type="submit" disabled={!searchQuery || searchQuery.trim() === ''}>Submit</button>
            </form>
            <div
                className={`picture-grid ${error || searchedPicture ? 'hidden' : ''}`}
                data-testid="picture-grid"
            >
                {pictures.map((picture, index) => (
                    <img
                        key={index}
                        className="picture"
                        src={picture}
                        alt={`Picture ${index + 1}`}
                    />
                ))}
            </div>
            <div className="picture-container" data-testid="picture-container">
                {error && <p className="error-message">Error: {error}</p>}
                {!error && searchedPicture && (
                    <img
                        data-testid="img"
                        className="searched-picture"
                        src={searchedPicture}
                        alt={searchQuery}
                    />
                )}
            </div>

        </>
    );
};

export default MainPage;
