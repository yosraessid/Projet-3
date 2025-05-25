// App.jsx
// This is the main component of the application. It manages the global state (fragments, tags, dark mode),
// handles data persistence (saving/loading), and sets up the main routes and layout.

import React from 'react'; // Import React
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import routing tools
import FragmentsPage from './components/FragmentsPage.jsx'; // Import the page for code snippets
import FragmentFormPage from './components/FragmentFormPage.jsx'; // Import the page for creating/editing a snippet
import TagsPage from './components/TagsPage.jsx'; // Import the page for tags
import InfoPage from './components/InfoPage.jsx'; // Import the info/about page
import CodeModal from './components/CodeModal.jsx'; // Import the modal for viewing code
import Header from './components/Header.jsx'; // Import the header/navigation bar
import './assets/app.css'; // Import global styles

// Detect if running in Electron or in the browser
const isElectron = Boolean(window.electron?.store);

// Utility functions for browser storage (localStorage)
const browserStore = {
  get: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : (key === 'darkMode' ? false : []);
    } catch {
      return key === 'darkMode' ? false : [];
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Use Electron store if available, otherwise use browser storage
const Store = isElectron ? window.electron.store : browserStore;

function App() {
  // State for code fragments (snippets)
  const [fragments, setFragments] = React.useState(() => Store.get('fragments') || []);
  // State for tags
  const [tags, setTags] = React.useState(() => Store.get('tags') || []);
  // State for code modal (content and visibility)
  const [modalCode, setModalCode] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // State for dark mode
  const [darkMode, setDarkMode] = React.useState(() => Store.get('darkMode') || false);

  // On mount: reload data from storage (to avoid losing data after refresh)
  React.useEffect(() => {
    setFragments(Store.get('fragments') || []);
    setTags(Store.get('tags') || []);
  }, []);

  // Save fragments to storage whenever they change
  React.useEffect(() => {
    Store.set('fragments', fragments);
  }, [fragments]);

  // Save tags to storage whenever they change
  React.useEffect(() => {
    Store.set('tags', tags);
  }, [tags]);

  // Save dark mode preference and update body class
  React.useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    Store.set('darkMode', darkMode);
  }, [darkMode]);

  // Keyboard shortcuts for navigation and focus
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        window.location.hash = '#/form';
      }
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        window.location.hash = '#/tags';
      }
      if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        window.location.hash = '#/info';
      }
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const input = document.querySelector('input[type="text"]');
        if (input) input.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Open the code modal with given code
  const openCodeModal = (code) => {
    setModalCode(code);
    setIsModalOpen(true);
  };

  // Close the code modal
  const closeCodeModal = () => {
    setIsModalOpen(false);
    setModalCode('');
  };

  // Add or edit a fragment (snippet)
  const addOrEditFragment = (fragmentData) => {
    setFragments(prevFragments => {
      const existingFragmentIndex = prevFragments.findIndex(frag => frag.id === fragmentData.id);
      const updatedFragments = existingFragmentIndex > -1
        ? prevFragments.map(frag => frag.id === fragmentData.id ? fragmentData : frag)
        : [...prevFragments, fragmentData];
      Store.set('fragments', updatedFragments);
      return updatedFragments;
    });
  };

  // Delete a fragment (snippet)
  const deleteFragment = (id) => {
    setFragments(prevFragments => {
      const updatedFragments = prevFragments.filter(frag => frag.id !== id);
      Store.set('fragments', updatedFragments);
      return updatedFragments;
    });
  };

  // Add a new tag
  const addTag = (tagData) => {
    if (!tagData || !tagData.name) return;
    setTags(prevTags => {
      const newTag = {
        id: Date.now(),
        name: tagData.name
      };
      const updatedTags = [...prevTags, newTag];
      Store.set('tags', updatedTags);
      return updatedTags;
    });
  };

  // Edit an existing tag
  const editTag = (updatedTag) => {
    setTags(prevTags => {
      const updatedTags = prevTags.map(tag => tag.id === updatedTag.id ? updatedTag : tag);
      Store.set('tags', updatedTags);
      return updatedTags;
    });
  };

  // Delete a tag
  const deleteTag = (id) => {
    setTags(prevTags => {
      const updatedTags = prevTags.filter(tag => tag.id !== id);
      Store.set('tags', updatedTags);
      return updatedTags;
    });
    // Also remove the tag from all fragments
    setFragments(prevFragments => {
      const updatedFragments = prevFragments.map(fragment => ({
        ...fragment,
        tags: fragment.tags.filter(tagId => tagId !== id)
      }));
      Store.set('fragments', updatedFragments);
      return updatedFragments;
    });
  };

  // Navigation helpers (not used but can be implemented)
  const navigateToEdit = (frag) => {
    // navigation to edit page if needed
  };
  const navigateToNewForm = () => {
    // navigation to new form if needed
  };

  // Render the main layout and routes
  return (
    <Router>
      <div
        style={{ minHeight: '100vh', background: darkMode ? '#18191a' : '#f5f5f5', color: darkMode ? '#f5f5f5' : '#222' }}
        // Drag & Drop handler for loading code from a file
        onDragOver={e => e.preventDefault()}
        onDrop={async e => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file && file.type === 'text/plain') {
            const text = await file.text();
            // Navigate to the form page with the file content
            window.location.hash = `#/form?code=${encodeURIComponent(text)}`;
          }
        }}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route
            path="/"
            element={<FragmentsPage fragments={fragments} tags={tags} openCodeModal={openCodeModal} navigateToEdit={navigateToEdit} navigateToNewForm={navigateToNewForm} />}
          />
          <Route
            path="/form"
            element={<FragmentFormPage tags={tags} onAddOrEditFragment={addOrEditFragment} onDeleteFragment={deleteFragment} />}
          />
          <Route
            path="/tags"
            element={<TagsPage tags={tags} onAddTag={addTag} onEditTag={editTag} onDeleteTag={deleteTag} fragments={fragments} />}
          />
          <Route
            path="/info"
            element={<InfoPage />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <CodeModal
          code={modalCode}
          isOpen={isModalOpen}
          onClose={closeCodeModal}
        />
      </div>
    </Router>
  );
}

export default App; // Export the main App component