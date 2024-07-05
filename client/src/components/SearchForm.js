import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [topic, setTopic] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!topic) {
            setError('Topic is required');
        } else {
            setError('');
            onSearch(topic);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input 
                type="text" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)} 
                placeholder="Enter topic" 
            />
            {error && <p>{error}</p>}
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
