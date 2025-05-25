import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

// FragmentFormPage.jsx
// This page provides a form to create or edit a code snippet (fragment).
// It handles the form state, saving, and deleting of fragments.

function FragmentFormPage({ tags = [], onAddOrEditFragment, onDeleteFragment }) {
  const navigate = useNavigate();
  const location = useLocation();
  const fragment = location.state?.fragment || null;
  // Si fragment est fourni, on est en mode édition, sinon création
  const [title, setTitle] = useState(fragment ? fragment.title : '');
  const [code, setCode] = useState(fragment ? fragment.code : '');
  const [selectedTags, setSelectedTags] = useState(fragment ? fragment.tags : []);

  // Gestion de la sélection des tags
  const handleTagChange = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  // Sauvegarde du fragment
  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;
    const fragData = {
      id: fragment ? fragment.id : Date.now(),
      title: title.trim(),
      code: code.trim(),
      tags: selectedTags
    };
    onAddOrEditFragment(fragData);
    navigate('/'); // Redirige vers la page Fragments
  };

  // Suppression du fragment et redirection
  const handleDelete = () => {
    if (fragment && fragment.id) {
      onDeleteFragment(fragment.id);
    }
    // Redirige toujours vers la page Fragments après la suppression
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', padding: 30, borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        
      </div>
      <h2 style={{ color: '#9147c7', marginBottom: 25 }}>{fragment ? 'Edit snippet' : 'New snippet'}</h2>
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 'bold', color: '#222' }}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 5 }}
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 'bold', color: '#222' }}>Code:</label>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            rows={7}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 5, fontFamily: 'monospace' }}
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 'bold', color: '#222' }}>Keywords:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 5 }}>
            {tags.length === 0 && <span style={{ color: '#888' }}>No tag available</span>}
            {tags.map(tag => (
              tag.name === 'État' || tag.name === 'State'
                ? (
                  <label key={tag.id} style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#7BC950', borderRadius: 5, padding: '4px 10px', cursor: 'pointer', fontWeight: 'bold' }}>
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagChange(tag.id)}
                      style={{ accentColor: '#9147c7' }}
                    />
                    <span style={{ color: '#fff' }}>{tag.name === 'État' ? 'State' : tag.name}</span>
                  </label>
                )
                : (
                  <label key={tag.id} style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#7BC950', borderRadius: 5, padding: '4px 10px', cursor: 'pointer', color: ['Redux', 'React', 'Réagir', 'NodeJs'].includes(tag.name) ? '#fff' : undefined, fontWeight: ['Redux', 'React', 'Réagir', 'NodeJs'].includes(tag.name) ? 'bold' : undefined }}>
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagChange(tag.id)}
                      style={{ accentColor: '#9147c7' }}
                    />
                    {['Réagir', 'État'].includes(tag.name) ? (tag.name === 'Réagir' ? 'React' : 'State') : tag.name}
                  </label>
                )
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
          <button 
            type="button" 
            onClick={handleDelete} 
            style={{ 
              background: 'red', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 5, 
              padding: '10px 28px', 
              fontWeight: 'bold', 
              fontSize: '1.1em', 
              cursor: 'pointer' 
            }}
          >
            Delete
          </button>
          <button 
            type="submit" 
            style={{ 
              background: '#E8E8E8', 
              color: '#000', 
              border: 'none', 
              borderRadius: 5, 
              padding: '10px 28px', 
              fontWeight: 'bold', 
              fontSize: '1.1em', 
              cursor: 'pointer' 
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default FragmentFormPage;