import React, { useState } from 'react';
import { supabase } from '../client.js';
import { Link } from 'react-router-dom';

const AddCreator = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const { data, error } = await supabase.from('creators').insert([
        { name, url, description, imageURL }
      ]);

      if (error) {
        throw error;
      }

      console.log('New creator added:', data);
      setName('');
      setUrl('');
      setDescription('');
      setImageURL('');
    } catch (error) {
      console.error("Error adding new creator:", error);
    }
  };

  return (
    <div>
      <h1>Add a Creator</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>

        <div>
          <label>URL:</label>
          <input type="url" value={url} onChange={e => setUrl(e.target.value)} required />
        </div>

        <div>
          <label>Description:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required></textarea>
        </div>

        <div>
          <label>Image URL (optional):</label>
          <input type="url" value={imageURL} onChange={e => setImageURL(e.target.value)} />
        </div>

        <button type="submit">Add Creator</button>
      </form>

      <Link to="/">Back to Home Page - Show All Creators</Link>
    </div>
  );
}

export default AddCreator;
