import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import ArticleList from './components/ArticleList';

const App = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false); 

    const handleSearch = async (topic) => {
        setLoading(true);
        setError('');
        setSearched(true); 
        try {
            const response = await axios.post('http://localhost:5000/api/scrape', { topic });
            setArticles(response.data.articles);
        } catch (err) {
            setError('Failed to fetch articles');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Updated articles:', articles);
    }, [articles]);

    return (
        <div className="app-container">
            <h1>Medium Article Scraper</h1>
            <SearchForm onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {searched && articles.length === 0 && !loading && !error && (
                <p>No articles were found, try another topic.</p>
            )}
            <ArticleList articles={articles} />
        </div>
    );
};

export default App;
