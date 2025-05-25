import React from 'react';
import PropTypes from 'prop-types';

// CodeModal.jsx
// This modal displays the code of a snippet and allows the user to copy it to the clipboard.

function CodeModal({ code, isOpen, onClose, darkMode }) {
  if (!isOpen) return null;

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
        background: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '800px',
        maxHeight: '80vh',
        position: 'relative'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>

        {/* Code content */}
        <pre style={{
          background: darkMode ? '#fff' : '#f8f9fa',
          color: darkMode ? '#111' : '#222',
          padding: '15px',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: 'calc(80vh - 60px)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: 'monospace',
          fontSize: '1.1em',
          fontWeight: 500
        }}>
          {code}
        </pre>

        {/* Copy button */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            alert('Code copied!');
          }}
          style={{
            background: '#3333b2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 15px',
            cursor: 'pointer',
            marginTop: '15px'
          }}
        >
          Copy code
        </button>
      </div>
    </div>
  );
}

CodeModal.propTypes = {
  code: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  darkMode: PropTypes.bool
};

export default CodeModal;