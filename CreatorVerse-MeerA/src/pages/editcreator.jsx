import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { supabase } from '../client.js';
import { Link } from 'react-router-dom';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [creator, setCreator] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
      if (data) {
        setCreator(data);

        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
        setImageURL(data.imageURL || '');

      } else {
        console.error("Error fetching creator:", error);
        setError('Creator not found or an error occurred.'); 
      }
    };

    fetchCreator();
  }, [id]);

  console.log('handleSubmit triggered111111');
  const handleSubmit = async (e) => {
    console.log('handleSubmit triggered');
    e.preventDefault();

    try {
      console.log('Updating with:', { name, url, description, imageURL });
      const { data, error } = await supabase.from('creators').update({
        name,
        url,
        description,
        imageURL
      }).eq('id', id);

      if (error) {
        throw error;
      }

      console.log('Creator updated:', data);

    } catch (error) {
      console.error("Error updating creator:", error);
    }
  };

  const deleteCreator = async () => {
    if (window.confirm("Are you sure you want to delete this content creator? This action cannot be undone.")) {
      const { error } = await supabase.from('creators').delete().eq('id', id);
      if (error) {
        alert('There was an error deleting the content creator');
        console.error("Error deleting creator:", error);
      } else {
        navigate('/');
      }
    }
  }

  if (error) return <div>{error}</div>;

  if (!creator) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <h1>Edit {name}</h1>
  
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL:</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imageURL">Image URL (optional):</label>
          <input
            type="url"
            id="imageURL"
            value={imageURL}
            onChange={e => setImageURL(e.target.value)}
          />
        </div>
        <button className="submit-button" type="submit">Update Creator</button>
      </form>
      <button className="delete-button" onClick={deleteCreator}>
        Delete Content Creator
      </button>
      <br />
      <Link to={`/`} className="back-link">
        Back to show all creators screen.
      </Link>
    </div>
  );  
}

export default EditCreator;
