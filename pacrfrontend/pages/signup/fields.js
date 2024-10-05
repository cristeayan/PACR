import { useState } from 'react';

export default function Home() {
  const [selectedFields, setSelectedFields] = useState([]);

  const fields = ["Medicine", "History", "Law", "Economics", "Engineering", "Physics"];

  const handleFieldClick = (field) => {
    if (selectedFields.includes(field)) {
      // Remove the field if it's already selected
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      // Add the field if it's not selected
      setSelectedFields([...selectedFields, field]);
    }
  };

  // Inline styles
  const styles = {
    container: {
      textAlign: 'center',
      marginTop: '50px',
    },
    fieldContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '10px',
      margin: '20px 0',
    },
    fieldButton: {
      padding: '10px 20px',
      border: '2px solid #ccc',
      backgroundColor: 'white',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s, border-color 0.3s',
    },
    selectedFieldButton: {
      backgroundColor: '#0070f3',
      color: 'white',
      borderColor: '#0070f3',
    },
    skipButton: {
      marginTop: '20px',
    },
    skipButtonInner: {
      padding: '10px 20px',
      backgroundColor: '#ccc',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
    },
    skipButtonInnerActive: {
      backgroundColor: '#0070f3',
      color: 'white',
    },
  };

  // Update heading and button text based on whether fields are selected
  const headingText = selectedFields.length > 0 ? "Great work! You've selected your fields!" : "Follow your field of choice";
  const buttonText = selectedFields.length > 0 ? "Let's Go!" : "Skip for now";

  return (
    <div style={styles.container}>
      <h1>{headingText}</h1>
      <div style={styles.fieldContainer}>
        {fields.map((field, index) => (
          <button
            key={index}
            style={{
              ...styles.fieldButton,
              ...(selectedFields.includes(field) ? styles.selectedFieldButton : {})
            }}
            onClick={() => handleFieldClick(field)}
          >
            {field}
          </button>
        ))}
      </div>

      <div style={styles.skipButton}>
        <button
          style={{
            ...styles.skipButtonInner,
            ...(selectedFields.length > 0 ? styles.skipButtonInnerActive : {})
          }}
        >
          {buttonText}
        </button>
      </div>
      
    </div>
  );
}
