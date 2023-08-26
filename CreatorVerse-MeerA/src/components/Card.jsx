import React from 'react';
import { Link } from 'react-router-dom';

const maxLength = 50;

const truncateText = (text) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const Card = ({ creator }) => {
  if (!creator) return null;

  return (
    <div className="card">
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={`${creator.name}'s image`}
          style={{ maxWidth: '400px', maxHeight: '300px' }}
        />
      )}

      <h2>{truncateText(creator.name)}</h2>
      
      <a href={creator.url} target="_blank" rel="noopener noreferrer">{/*{truncateText(creator.url)}*/}</a>

      <p>{truncateText(creator.description)}</p>
      
      <Link to={`/edit/${creator.id}`}>Edit</Link>
    </div>
  );
}

export default Card;