import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    file: null,
    tags: '',
    isPublic: false,
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);

        const contentResponse = await axios.get('/api/content', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContent(contentResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleUploadChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setUploadData({
        ...uploadData,
        [name]: files[0],
      });
    } else {
      setUploadData({
        ...uploadData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadData.title) {
      alert('Please enter a title');
      return;
    }

    if (!uploadData.file) {
      alert('Please select a file to upload');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', uploadData.title);
      formData.append('description', uploadData.description);
      formData.append('file', uploadData.file);
      formData.append('tags', uploadData.tags);
      formData.append('isPublic', uploadData.isPublic);

      const response = await axios.post('/api/content', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setContent([response.data, ...content]);
      setUploadData({
        title: '',
        description: '',
        file: null,
        tags: '',
        isPublic: false,
      });
      setShowUploadForm(false);
      alert('House plan uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🏠 House Plans - AR Platform</h1>
        <div className="user-info">
          <span>{user?.username}</span>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="sidebar">
          <nav>
            <h3>Menu</h3>
            <ul>
              <li><a href="#dashboard">📊 Dashboard</a></li>
              <li><a href="#content">📁 My Plans</a></li>
              <li><a href="#ar">👓 AR Viewer</a></li>
              <li><a href="#help">❓ Help</a></li>
            </ul>
          </nav>
        </div>

        <div className="main-content">
          <section className="upload-section">
            <div className="section-header">
              <h2>Upload House Plans</h2>
              <button
                className="toggle-btn"
                onClick={() => setShowUploadForm(!showUploadForm)}
              >
                {showUploadForm ? '✕ Cancel' : '+ Upload Plan'}
              </button>
            </div>

            {showUploadForm && (
              <form className="upload-form" onSubmit={handleUploadSubmit}>
                <div className="form-group">
                  <label>Plan Title</label>
                  <input
                    type="text"
                    name="title"
                    value={uploadData.title}
                    onChange={handleUploadChange}
                    placeholder="e.g., Modern 3-Bedroom Home"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={uploadData.description}
                    onChange={handleUploadChange}
                    placeholder="Describe the house plan..."
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Upload Image/PDF</label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleUploadChange}
                    accept="image/*,.pdf"
                    required
                  />
                  <small>Supports: JPG, PNG, PDF (Max 50MB)</small>
                </div>
                <div className="form-group">
                  <label>Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={uploadData.tags}
                    onChange={handleUploadChange}
                    placeholder="e.g., modern, 3-bedroom, eco-friendly"
                  />
                </div>
                <div className="form-group checkbox">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={uploadData.isPublic}
                    onChange={handleUploadChange}
                  />
                  <label>Make Public (viewable by others)</label>
                </div>
                <button type="submit" disabled={uploading}>
                  {uploading ? '⏳ Uploading...' : '🚀 Upload Plan'}
                </button>
              </form>
            )}
          </section>

          <section className="content-section">
            <h2>📋 Your House Plans</h2>
            {content.length === 0 ? (
              <p className="empty-state">No plans yet. Upload your first house plan to get started!</p>
            ) : (
              <div className="content-grid">
                {content.map((item) => (
                  <div key={item._id} className="content-card">
                    <div className="card-image">
                      <img src={item.imageUrl} alt={item.title} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="card-tags">
                      {item.tags && item.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="card-footer">
                      <span className="views">👁️ {item.views} views</span>
                      <span className={`public-badge ${item.isPublic ? 'public' : 'private'}`}>
                        {item.isPublic ? '🌐 Public' : '🔒 Private'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="ar-section">
            <h2>👓 View in AR</h2>
            <div className="ar-info">
              <p>Open your AR plans on Meta Quest Pro:</p>
              <ol>
                <li>Open Meta Quest Pro browser</li>
                <li>Navigate to: <code>http://your-ip:8000/ar-app/viewer.html</code></li>
                <li>Your plans will appear in AR space</li>
                <li>Position and scale them with hand gestures</li>
              </ol>
              <button className="ar-btn" onClick={() => alert('AR viewer coming soon! Copy the viewer.html to your server.')}>
                View AR Instructions
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
