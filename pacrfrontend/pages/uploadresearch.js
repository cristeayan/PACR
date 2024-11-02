import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Header from '../components/Header';
import { useUser } from '../context/UserContext';

const UploadResearch = () => {
  const { user, token } = useUser();
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [newAuthor, setNewAuthor] = useState(""); // Input field for adding new authors
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
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
      setFiles([...files, ...acceptedFiles]); // Append new files
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

  // Add author on 'Enter' or 'Comma' key press
  const handleAuthorKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();  // Prevent form submission
      if (formData.authorName.trim()) {
        setFormData({
          ...formData,
          authors: [...formData.authors, formData.authorName.trim()],
          authorName: '',
        });
      }
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

    // Basic validation
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
          submissionData.append('uploaded_files', file);
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
    <div style={styles.mainWrapper}>
      <Header />
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
                transition: 'all 0.3s ease',
              },
            })}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop files here, or click to select files (PDF, DOC)</p>
          </div>
          {files.length > 0 && renderUploadedFiles()}
        </div>

        {/* Authors Field (Input and List) */}
        <div style={styles.formGroup}>
          <label htmlFor="authors" style={styles.label}>Authors</label>
          <div style={styles.authorInputGroup}>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              onKeyDown={handleAuthorKeyDown}
              placeholder="Enter author's name and press Enter"
              style={styles.input}
            />
          </div>
          {formData.authors.length > 0 && (
            <ul style={styles.authorList}>
              {formData.authors.map((author, index) => (
                <li key={index} style={styles.authorItem}>
                  <span style={styles.authorTag}>{author}</span>
                  <button type="button" onClick={() => handleRemoveAuthor(index)} style={styles.removeButton}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
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

        {/* Date of Publication */}
        <div style={styles.formGroup}>
          <label htmlFor="date" style={styles.label}>Date of Publication</label>
          <div style={styles.dateGroup}>
            <select
              id="publicationDay"
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              style={styles.dateSelect}
            >
              <option value="">Day</option>
              {[...Array(31).keys()].map((day) => (
                <option key={day + 1} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>
            <select
              id="publicationMonth"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              style={styles.dateSelect}
            >
              <option value="">Month</option>
              {[
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
              ].map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              id="publicationYear"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              style={styles.dateSelect}
            >
              <option value="">Year</option>
              {[...Array(100).keys()].map((year) => (
                <option key={year + 1923} value={year + 1923}>
                  {year + 1923}
                </option>
              ))}
            </select>
          </div>
          {errors.date && <span style={styles.error}>{errors.date}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Upload
        </button>
      </form>
    </div>
   </div>
  );
};

const styles = {
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '140px 20px 80px',
  },
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
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
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    fontSize: '1rem',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  textarea: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'vertical',
    fontSize: '1rem',
  },
  select: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
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
    transition: 'all 0.3s ease',
  },
  fileList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '10px',
  },
  authorInputGroup: {
    display: 'flex',
    gap: '10px',
  },
  authorList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  authorItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px',
    backgroundColor: '#e9f7ff',
    borderRadius: '4px',
    marginBottom: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  authorTag: {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginRight: '8px',
  },
  addButton: {
    padding: '8px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  removeButton: {
    padding: '4px 8px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  dateGroup: {
    display: 'flex',
    gap: '10px',
  },
  dateSelect: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '30%',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
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
