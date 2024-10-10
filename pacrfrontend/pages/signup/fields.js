import "../../app/globals.css";
import { useState } from 'react';


export default function Home() {
  const [selectedFields, setSelectedFields] = useState([]);

  const fields = ["Medicine", "History", "Law", "Economics", "Engineering", "Physics", "Chemistry", "Biology", "Pshycology", "Space Sciences", "Education", "Architecture", "Environmental Engineering", "Sociology"];

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
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      rowGap: '150px',
      padding: '60px 20px 68px',
      justifyContent: 'center'
    },
    fieldContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      columnGap: '8px',
      rowGap: '16px',
      maxWidth: '72.625rem',
      width: '100%'
    },
    mainHeading: {
      fontSize: '52px',
      fontWeight: '400',
      lineHeight: '57.2px',
      textAlign: 'center',
      color: '#313131',
      letterSpacing: '-2px'
    },
    fieldButton: {
      padding: '16px 60px',
      border: '1px solid #313131',
      backgroundColor: 'white',
      borderRadius: '200px',
      cursor: 'pointer',
      fontSize: '16px',
      lineHeight: '17.6px',
      fontWeight: '500',
      transition: 'background-color 0.3s, border-color 0.3s',
    },
    selectedFieldButton: {
      backgroundColor: '#717171',
      color: 'white',
      borderColor: '#717171',
    },
    skipButton: {
      padding: '16px 60px',
      order: '1px solid #313131',
      backgroundColor: 'white',
      borderRadius: '200px',
      cursor: 'pointer',
      fontSize: '16px',
      lineHeight: '17.6px',
      fontWeight: '500',
      transition: 'background-color 0.3s, border-color 0.3s',
    },
    skipButtonInner: {
        padding: '16px 60px',
        border: '1px solid #313131',
        backgroundColor: 'white',
        borderRadius: '200px',
        cursor: 'pointer',
        fontSize: '16px',
        lineHeight: '17.6px',
        fontWeight: '500',
        transition: 'background-color 0.3s, border-color 0.3s',
    },
    skipButtonInnerActive: {
      backgroundColor: '#70d4fc',
      border: '1px solid #70d4fc',
      color: 'white',
    },
    relativeBlock: {
      position: 'relative',
      width: '100%',
      maxWidth: '76rem'
    },
    pacrLogo: {
      position: 'absolute',
      left: '0',
      top: '14px'
    },
  };

  // Update heading and button text based on whether fields are selected
  const headingText = selectedFields.length > 0 ? "Great work! You've selected your fields!" : "Follow your field of choice";
  const buttonText = selectedFields.length > 0 ? "Let's Go!" : "Skip for now";

  return (
    <div style={styles.container}>
     <div style={styles.relativeBlock}>
      <img src="/PACR Logo.svg" style={styles.pacrLogo} alt="PACR Logo"></img>
      <h1 style={styles.mainHeading}>{headingText}</h1></div>
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