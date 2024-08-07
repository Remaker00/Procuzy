import React from 'react';
import Article from './Article';

const ArticleList = ({ articles }) => {
    console.log(articles);
    return (
        <div>
            {articles.map((article, index) => (
                <Article key={index} article={article} />
            ))}
        </div>
    );
};

export default ArticleList;
