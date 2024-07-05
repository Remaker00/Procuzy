import React from 'react';

const Article = ({ article }) => {
    console.log(article);
    return (
        <div className="article-container">
            <h3>{article.title}</h3>
            <p><span>Author:</span> {article.author}</p>
            <p><span>Published:</span> {article.pubdate}</p>
            <p><span>URL:</span> <a href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</a></p>
        </div>
    );
};

export default Article;
