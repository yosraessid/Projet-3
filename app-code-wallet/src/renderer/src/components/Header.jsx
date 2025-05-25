import { Link } from 'react-router-dom';
import { useState } from 'react'; // Importer useState si le mode sombre était géré ici
import PropTypes from 'prop-types';

// Header.jsx
// This component displays the top navigation bar with links and a dark mode toggle button.

function Header({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? '#ffffff' : '#121212';
    document.body.style.color = darkMode ? '#000000' : '#ffffff';
  };

  // Style pour le logo texte temporaire
  const logoStyle = {
    color: '#ffffff', // Texte blanc pour le logo
    fontSize: '1.6em', // Taille un peu plus grande
    fontWeight: 'bold',
    marginRight: '25px',
    textDecoration: 'none',
    letterSpacing: '0.5px' // Petit espacement pour le style
  };

  const navLinkStyle = {
    color: '#ffffff', // Texte blanc pour les liens
    textDecoration: 'none',
    fontSize: '1.1em', // Taille de texte un peu plus grande
    padding: '5px 10px', // Espacement autour du texte
    borderRadius: '4px', // Coins légèrement arrondis
    transition: 'background-color 0.3s ease' // Animation douce au survol
  };

  const navLinkHoverStyle = {
     backgroundColor: 'rgba(255, 255, 255, 0.2)' // Fond semi-transparent au survol
  };

  return (
    <div style={{ marginBottom: '20px' }}> {/* Ajout d'un espace entre le header et le body */}
      <nav style={{
        background: '#9A48D0', // Couleur de ta charte graphique
        padding: '15px 25px', // Plus d'espacement
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Petite ombre pour la séparation
      }}>
        {/* Logo temporaire (texte) */}
        <Link to="/" style={logoStyle}>Code Wallet</Link>

        {/* Liens de navigation */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/fragments" style={navLinkStyle} onMouseOver={(e) => e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Snippets</Link>
          <Link to="/tags" style={{...navLinkStyle, marginLeft: '15px'}} onMouseOver={(e) => e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Tags</Link>
          <Link to="/info" style={{...navLinkStyle, marginLeft: '15px'}} onMouseOver={(e) => e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>Info</Link>

          {/* Dark mode button */}
          <button onClick={toggleDarkMode} style={{
            marginLeft: '15px',
            padding: '5px 10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: darkMode ? '#ffffff' : '#121212',
            color: darkMode ? '#121212' : '#ffffff',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}>
            {darkMode ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>
    </div>
  );
}

// PropTypes si tu utilises la validation de props
Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export default Header;