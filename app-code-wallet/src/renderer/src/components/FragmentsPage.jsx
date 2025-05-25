import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

// FragmentsPage.jsx
// This page displays the list of code snippets (fragments) and allows navigation to create, edit, or view details.
// It also shows tags associated with each fragment.

function FragmentsPage({ fragments, tags, openCodeModal }) {
  const navigate = useNavigate()

  const handleNewFragment = () => {
    navigate('/form') // Redirect to the creation form
  }

  const handleEditFragment = (fragmentId) => {
    navigate(`/form/${fragmentId}`) // Redirect to the edit form
  }

  const handleViewTags = () => {
    navigate('/tags') // Redirect to the tags page
  }

  const handleCardClick = (fragmentId, event) => {
    if (event.target.closest('.view-icon-button, .tag')) {
      return;
    }
    const fragment = fragments.find(frag => frag.id === fragmentId);
    if (fragment) {
      navigate('/form', { state: { fragment } }); // Redirect with pre-filled data
    }
  }

  return (
    <div style={styles.container}>
      {/* New Fragment Button */}
      <div style={styles.newButtonContainer}>
        <button onClick={handleNewFragment} style={styles.newButton}>
         New
        </button>
      </div>

      {/* Fragments List */}
      <div style={styles.fragmentsList}>
        {fragments.length === 0 ? (
          <p style={styles.noFragments}>No snippet available</p>
        ) : (
          fragments.map((fragment) => (
            <div
              key={fragment.id}
              onClick={(e) => handleCardClick(fragment.id, e)}
              style={styles.fragmentCard}
            >
              <div style={styles.fragmentContent}>
                <h3 style={styles.fragmentTitle}>
                  {fragment.title || 'Untitled'}
                </h3>
                {/* Tags removed here */}
              </div>

              {/* Tags (green) and Preview (eye) buttons on the right */}
              <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                {fragment.tags && fragment.tags.length > 0 && (
                  fragment.tags.map((tagId) => {
                    const tag = tags.find((t) => t.id === tagId)
                    return tag ? (
                      <span
                        key={tag.id}
                        className="tag"
                        style={{
                          background: '#7BC950',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          padding: '2px 16px',
                          fontWeight: 'bold',
                          fontSize: '1em',
                          marginLeft: '0',
                          marginRight: '0',
                          display: 'inline-flex',
                          alignItems: 'center',
                          boxShadow: 'none',
                          outline: 'none',
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewTags()
                        }}
                      >
                        {tag.name}
                      </span>
                    ) : null
                  })
                )}
                <button
                  className="view-icon-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    openCodeModal(fragment.code)
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '38px',
                    marginLeft: '8px',
                  }}
                >
                  <span role="img" aria-label="Preview" style={{ fontSize: 38, color: '#444' }}>👁️</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto'
  },
  newButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px'
  },
  newButton: {
    background: 'white',
    color: '#9A48D0',
    border: '2px solid #9A48D0',
    borderRadius: '10px',
    padding: '18px 38px',
    cursor: 'pointer',
    fontSize: '22px',
    fontWeight: 'bold',
    transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
    boxShadow: '0 1px 8px rgba(154,72,208,0.04)',
    outline: 'none',
    margin: '0 auto',
    display: 'block',
    letterSpacing: '0.5px',
  },
  fragmentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  fragmentCard: {
    background: '#F8F9FA',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
  },
  fragmentContent: {
    flexGrow: 1
  },
  fragmentTitle: {
    margin: '0 0 10px 0',
    color: '#333'
  },
  tagsContainer: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  tag: {
    background: '#E0F7FA',
    color: '#00796B',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.85em',
    cursor: 'pointer',
    transition: 'background 0.2s',
    ':hover': {
      background: '#B2EBF2'
    }
  },
  viewButton: {
    background: 'transparent',
    border: '1px solid #6A0DAD',
    color: '#6A0DAD',
    borderRadius: '5px',
    padding: '8px 15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'background 0.2s',
    ':hover': {
      background: '#F3E5F5'
    }
  },
  noFragments: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  }
}

FragmentsPage.propTypes = {
  fragments: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  openCodeModal: PropTypes.func.isRequired
}

export default FragmentsPage