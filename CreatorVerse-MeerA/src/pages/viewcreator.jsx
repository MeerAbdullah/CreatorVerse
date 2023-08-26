import React, { useState, useEffect } from 'react';
import { supabase } from '../client.js';
import { useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const maxLength = 50;

const truncateText = (text) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const ViewCreator = () => {
  const [creator, setCreator] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();

        if (error) {
          throw error;
        }

        setCreator(data);
      } catch (error) {
        console.error("Error fetching content creator: ", error);
      }
    };

    fetchCreator();
  }, [id]);

  if (!creator) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{creator.name}</h1>

      {/*<h2>{creator.name}</h2>*/}
      <a href={creator.url} target="_blank" rel="noopener noreferrer">{/*{truncateText(creator.url)}*/}</a>
      <p>{creator.description}</p>
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={`${creator.name}'s image`}
          style={{ maxWidth: '300px', maxHeight: '200px' }} 
        />
      )}
      <br/>
      <Link to={`/edit/${creator.id}`}>Edit Creator</Link>
      <br/>
      <Link to={`/`}>Home Page</Link>
    </div>
  );
}

export default ViewCreator;
