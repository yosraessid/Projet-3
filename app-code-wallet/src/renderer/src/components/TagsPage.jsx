// TagsPage.jsx
// This page allows the user to view, create, edit, and delete tags for code snippets.
// It manages the tag list and the modal for editing/creating tags.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TagEditModal from './TagEditModal';

function TagsPage({ tags = [], onAddTag, onEditTag, onDeleteTag }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the edit modal with an existing tag or empty for creation
  const handleOpenModal = (tag = null) => {
    setSelectedTag(tag);
    setIsModalOpen(true);
  };

  // Close the modal and reset the selected tag
  const handleCloseModal = () => {
    setSelectedTag(null);
    setIsModalOpen(false);
  };

  // Handle saving a tag (creation or editing)
  const handleSaveTag = (tagData) => {
    try {
      if (!tagData?.name?.trim()) {
        throw new Error('Tag name cannot be empty');
      }

      const trimmedName = tagData.name.trim();
      
      // Check for duplicates
      const isDuplicate = tags.some(tag => 
        tag.name.toLowerCase() === trimmedName.toLowerCase() && 
        tag.id !== (selectedTag?.id)
      );

      if (isDuplicate) {
        throw new Error('A tag with this name already exists');
      }

      if (selectedTag) {
        // If editing an existing tag
        onEditTag({
          id: selectedTag.id,
          name: trimmedName
        });
      } else {
        // If creating a new tag
        onAddTag({
          name: trimmedName
        });
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error while saving:', error);
      throw error; // Propagate the error so the modal can display it
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Application header */}


      <div style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
      }}>
        {/* Section header with New button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '25px' 
        }}>
          <h2 style={{ 
            color: '#333', 
            margin: 0,
            fontSize: '1.5em'
          }}>
            Tags
          </h2>
          <button
            onClick={() => handleOpenModal()}
            style={{
              background: '#9A48D0',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '8px 20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            New
          </button>
        </div>

        {/* Tag list */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {tags.map(tag => (
            <div
              key={tag.id}
              onClick={() => handleOpenModal(tag)}
              style={{
                background: '#7BC950',
                color: '#fff',
                padding: '6px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9em',
                transition: 'all 0.2s ease',
                userSelect: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                ':hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }
              }}
            >
              {tag.name}
            </div>
          ))}
          {tags.length === 0 && (
            <p style={{ color: '#666' }}>No tag available. Click "New" to create one.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <TagEditModal
          tag={selectedTag}
          onClose={handleCloseModal}
          onSave={handleSaveTag}
          onDelete={onDeleteTag}
        />
      )}
    </div>
  );
}

export default TagsPage;