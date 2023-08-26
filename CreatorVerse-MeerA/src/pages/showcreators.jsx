import React, { useState, useEffect } from 'react';
import { supabase } from '../client.js';
import Card from '../components/Card'; 
import { Link } from 'react-router-dom';


const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from('creators').select('*');

        if (error) {
          throw error;
        }

        setCreators(data);
      } catch (error) {
        console.error("Error fetching content creators: ", error);
      }
    };

    fetchCreators();
  }, []);

  return (
    <div>
      <h1>All Creators</h1>

      {creators.length ? (
        creators.map(creator => (
          <>
            <Card key={creator.id} creator={creator} />
            <Link to={`/view/${creator.id}`}>View this creator</Link>
          </>
        ))
      ) : (
        <p>No content creators found in the database.</p>
      )}
      <br/>
      <Link to="/new">Add a New Creator</Link>
    </div>
  );
}

export default ShowCreators;
