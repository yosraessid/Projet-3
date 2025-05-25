// TagEditModal.jsx
// This modal allows the user to create or edit a tag. It manages the form state and handles save/delete actions.

import React, { useState } from 'react';

function TagEditModal({ tag, onClose, onSave, onDelete }) {
  const [name, setName] = useState(tag ? tag.name : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Tag name cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      await onSave({
        name: trimmedName
      });
      onClose();
    } catch (error) {
      console.error('Error while saving:', error);
      setError(error.message || 'An error occurred while saving');
      setIsSubmitting(false);
    }
  };

  // Gestion de la suppression
  const handleDelete = async () => {
    if (!tag?.id) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this tag?');
    if (!confirmDelete) return;

    setIsSubmitting(true);
    setError('');
    
    try {
      await onDelete(tag.id);
      onClose();
    } catch (error) {
      console.error('Error while deleting:', error);
      setError('An error occurred while deleting');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ 
          color: '#333', 
          marginBottom: '25px',
          fontSize: '1.5em',
          fontWeight: 'normal'
        }}>
          {tag ? 'Edit tag' : 'New tag'}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Error message */}
          {error && (
            <div style={{ 
              color: '#dc3545', 
              fontSize: '0.9em', 
              padding: '8px', 
              background: '#ffe6e6', 
              borderRadius: '4px' 
            }}>
              {error}
            </div>
          )}

          {/* Tag name input */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#555',
              fontSize: '0.95em'
            }}>
              Tag name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter tag name..."
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '0.95em',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              required
              autoFocus
            />
          </div>

          {/* Action buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '25px'
          }}>
            {/* Delete button - visible only in edit mode */}
            <div>
              {tag && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  style={{
                    background: 'transparent',
                    color: '#dc3545',
                    border: '1px solid #dc3545',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                >
                  Delete
                </button>
              )}
            </div>

            {/* Cancel and Save buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                style={{
                  background: '#f8f9fa',
                  color: '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isSubmitting ? 0.6 : 1,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim() || isSubmitting}
                style={{
                  background: '#7BC950', // green as requested
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 20px',
                  cursor: !name.trim() || isSubmitting ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  opacity: !name.trim() || isSubmitting ? 0.6 : 1,
                  transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
                  boxShadow: name.trim() && !isSubmitting ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                  minWidth: '120px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px'
                }}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TagEditModal;
