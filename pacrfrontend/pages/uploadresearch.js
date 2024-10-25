import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUser } from '../context/UserContext';
import { Router } from 'next/router';

const UploadResearch = () => {
  const { user, token } = useUser();
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [newAuthor, setNewAuthor] = useState(""); // Input field for adding new authors
  const [formData, setFormData] = useState({
    title: '',
    authors: [],
    publication_type: '',
    article_type: '', // Add article_type to the formData state
    date_of_publication: '', // Replaced day, month, year with single date_of_publication field
    abstract: '',
    doi: '',
    articleLink: '',
    pubMedID: '',
    scopusLink: ''
  });

  const [errors, setErrors] = useState({});

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
    },
    onDragEnter: () => setDragging(true),
    onDragLeave: () => setDragging(false),
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
      setDragging(false);
    },
  });

  const renderUploadedFiles = () => (
    <ul style={styles.fileList}>
      {files.map((file, index) => (
        <li key={index}>{file.path}</li>
      ))}
    </ul>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to add a new author
  const handleAddAuthor = () => {
    if (newAuthor.trim() !== "") {
      setFormData({ ...formData, authors: [...formData.authors, newAuthor] });
      setNewAuthor(""); // Clear the input field after adding
    }
  };

  // Function to remove an author by index
  const handleRemoveAuthor = (indexToRemove) => {
    setFormData({
      ...formData,
      authors: formData.authors.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Form validation here
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.publication_type) newErrors.publication_type = 'Publication type is required';
    if (!formData.article_type) newErrors.article_type = 'Article type is required';
    if (!formData.abstract) newErrors.abstract = 'Abstract is required';
    if (!formData.date_of_publication) newErrors.date_of_publication = 'Publication date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const submissionData = new FormData();
        submissionData.append('title', formData.title);
        submissionData.append('authors', formData.authors);
        submissionData.append('publication_type', formData.publication_type);
        submissionData.append('article_type', formData.article_type);
        submissionData.append('date_of_publication', formData.date_of_publication);
        submissionData.append('abstract', formData.abstract);
        submissionData.append('doi', formData.doi);
        submissionData.append('articleLink', formData.articleLink);
        submissionData.append('pubMedID', formData.pubMedID);
        submissionData.append('scopusLink', formData.scopusLink);

        // Append files to the form data
        files.forEach((file) => {
          submissionData.append('files', file);
        });

        const response = await fetch('http://127.0.0.1:8000/api/journals/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,  // Include the JWT token for authentication
          },
          body: submissionData,
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const result = await response.json();
        console.log('Form Submitted', result);
        setErrors({});
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  // Prevent form submission on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit} style={styles.form} onKeyDown={handleKeyDown}>
        {/* Type of Publication */}
        <div style={styles.formGroup}>
          <label htmlFor="publication_type" style={styles.label}>Type of Publication</label>
          <select
            id="publication_type"
            name="publication_type"
            value={formData.publication_type}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="">Select Type</option>
            <option value="article">Article</option>
            <option value="review">Review</option>
            <option value="caseReport">Case Report</option>
          </select>
          {errors.publication_type && <span style={styles.error}>{errors.publication_type}</span>}
        </div>

        {/* Type of Article */}
        <div style={styles.formGroup}>
          <label htmlFor="article_type" style={styles.label}>Type of Article</label>
          <select
            id="article_type"
            name="article_type"
            value={formData.article_type}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="">Select Article Type</option>
            <option value="originalResearch">Original Research</option>
            <option value="clinicalTrial">Clinical Trial</option>
            <option value="metaAnalysis">Meta Analysis</option>
          </select>
          {errors.article_type && <span style={styles.error}>{errors.article_type}</span>}
        </div>

        {/* Authors Field */}
        <div style={styles.formGroup}>
          <label htmlFor="authors" style={styles.label}>Authors</label>
          <div style={styles.authorsField}>
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Add a new author"
              style={styles.input}
            />
            <button type="button" onClick={handleAddAuthor} style={styles.addButton}>
              Add Author
            </button>
          </div>
          <ul style={styles.authorsList}>
            {formData.authors.map((author, index) => (
              <li key={index} style={styles.authorItem}>
                {author}
                <button
                  type="button"
                  onClick={() => handleRemoveAuthor(index)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Title Field */}
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter the title"
            style={styles.input}
          />
          {errors.title && <span style={styles.error}>{errors.title}</span>}
        </div>

        {/* Abstract Field */}
        <div style={styles.formGroup}>
          <label htmlFor="abstract" style={styles.label}>Abstract</label>
          <textarea
            id="abstract"
            name="abstract"
            value={formData.abstract}
            onChange={handleInputChange}
            placeholder="Enter the abstract"
            style={styles.textarea}
          />
          {errors.abstract && <span style={styles.error}>{errors.abstract}</span>}
        </div>

        {/* File Upload with Drag-and-Drop */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Upload File</label>
          <div
            {...getRootProps({
              style: {
                ...styles.dropzone,
                borderColor: dragging ? '#007bff' : '#ccc',
                backgroundColor: dragging ? '#e9f7ff' : '#f9f9f9',
              },
            })}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop files here, or click to select files (PDF, DOC)</p>
          </div>
          {files.length > 0 && renderUploadedFiles()}
        </div>

        {/* DOI Field */}
        <div style={styles.formGroup}>
          <label htmlFor="doi" style={styles.label}>DOI (Optional)</label>
          <input
            type="text"
            id="doi"
            name="doi"
            value={formData.doi}
            onChange={handleInputChange}
            placeholder="Enter DOI"
            style={styles.input}
          />
        </div>

        {/* Link to Article Field */}
        <div style={styles.formGroup}>
          <label htmlFor="articleLink" style={styles.label}>Link to Article (Optional)</label>
          <input
            type="url"
            id="articleLink"
            name="articleLink"
            value={formData.articleLink}
            onChange={handleInputChange}
            placeholder="Enter Article Link"
            style={styles.input}
          />
        </div>

        {/* PubMed ID Field */}
        <div style={styles.formGroup}>
          <label htmlFor="pubMedID" style={styles.label}>PubMed ID (Optional)</label>
          <input
            type="text"
            id="pubMedID"
            name="pubMedID"
            value={formData.pubMedID}
            onChange={handleInputChange}
            placeholder="Enter PubMed ID"
            style={styles.input}
          />
        </div>

        {/* Link to Scopus Field */}
        <div style={styles.formGroup}>
          <label htmlFor="scopusLink" style={styles.label}>Link to Scopus (Optional)</label>
          <input
            type="url"
            id="scopusLink"
            name="scopusLink"
            value={formData.scopusLink}
            onChange={handleInputChange}
            placeholder="Enter Scopus Link"
            style={styles.input}
          />
        </div>

        {/* Date of Publication (Now as a single date input) */}
        <div style={styles.formGroup}>
          <label htmlFor="date_of_publication" style={styles.label}>Date of Publication</label>
          <input
            type="date"
            id="date_of_publication"
            name="date_of_publication"
            value={formData.date_of_publication}
            onChange={handleInputChange}
            style={styles.input}
          />
          {errors.date_of_publication && <span style={styles.error}>{errors.date_of_publication}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Upload
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
  },
  select: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  dropzone: {
    padding: '20px',
    borderWidth: '2px',
    borderRadius: '4px',
    borderColor: '#ccc',
    borderStyle: 'dashed',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    cursor: 'pointer',
  },
  fileList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '10px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  authorsField: {
    display: 'flex',
    gap: '10px',
  },
  addButton: {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  authorsList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '10px',
  },
  authorItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    marginBottom: '4px',
  },
  removeButton: {
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
  },
};

export default UploadResearch;
