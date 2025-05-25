// InfoPage.jsx
// This page displays information about the application: features, developer info, and legal information.

import React from 'react';
import { Link } from 'react-router-dom';

function InfoPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        
      
      </div>

      <div style={{
        background: '#ffffff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
      }}>
        {/* Section 1: Features */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#7BC950', marginBottom: '20px' }}>Code Wallet Features</h2>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#666', marginBottom: '15px' }}>Snippet Management</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '10px', background: '#f8f9fa', marginBottom: '10px', borderRadius: '5px', color: '#222' }}>
                ✏️ Create and edit code snippets with title and content
              </li>
              <li style={{ padding: '10px', background: '#f8f9fa', marginBottom: '10px', borderRadius: '5px', color: '#222' }}>
                🏷️ Organize with customizable tags
              </li>
              <li style={{ padding: '10px', background: '#f8f9fa', marginBottom: '10px', borderRadius: '5px', color: '#222' }}>
                🗑️ Simple snippet deletion
              </li>
              <li style={{ padding: '10px', background: '#f8f9fa', marginBottom: '10px', borderRadius: '5px', color: '#222' }}>
                📋 Quick copy to clipboard
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Developer Info */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#7BC950', marginBottom: '20px' }}>Development Team</h2>
          <div style={{ 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#666', marginBottom: '15px' }}>Developed by</h3>
            <p style={{ marginBottom: '10px', color: '#222' }}>🧑‍💻 Yosra ESSID</p>
            <p style={{ marginBottom: '10px', color: '#222' }}>📅 Version 1.0.0 - May 2025</p>
            <p style={{ marginBottom: '10px', color: '#222' }}>📧 Contact: yosraessid.stud@gmail.com</p>
          </div>
          <div style={{ 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '8px' 
          }}>
            <h3 style={{ color: '#666', marginBottom: '15px' }}>Technologies Used</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px', color: '#222' }}>⚛️ React.js</li>
              <li style={{ marginBottom: '8px', color: '#222' }}>⚡ Electron</li>
              <li style={{ marginBottom: '8px', color: '#222' }}>🎨 CSS-in-JS</li>
              <li style={{ marginBottom: '8px', color: '#222' }}>📦 Node.js</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Legal Info */}
        <section>
          <h2 style={{ color: '#7BC950', marginBottom: '20px' }}>Legal Information</h2>
          <div style={{ 
            padding: '20px', 
            background: '#f8f9fa', 
            borderRadius: '8px' 
          }}>
            <h3 style={{ color: '#666', marginBottom: '15px' }}>Data Management</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '15px' , color: '#222'}}>
                🔒 <strong>Local Storage:</strong> All data is stored locally on your computer
              </li>
              <li style={{ marginBottom: '15px', color: '#222' }}>
                🤝 <strong>Privacy:</strong> No data is shared with external servers
              </li>
              <li style={{ marginBottom: '15px', color: '#222' }}>
                🗑️ <strong>Deletion:</strong> You can delete your data at any time
              </li>
              <li style={{ marginBottom: '15px', color: '#222' }}>
                📜 <strong>License:</strong> Application under MIT license
              </li>
            </ul>
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: '#fff', 
              borderRadius: '5px', 
              border: '1px solid #ddd' 
            }}>
              <p style={{ fontSize: '0.9em', color: '#666' }}>
                © 2025 Code Wallet. All rights reserved.<br />
                This application is intended for personal and professional use.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default InfoPage;