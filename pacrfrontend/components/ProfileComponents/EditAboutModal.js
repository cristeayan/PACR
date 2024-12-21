import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const EditAboutModal = ({ isOpen, onClose, aboutText, onSave, user, token,setUserAndToken }) => {
    const [summary, setSummary] = useState(aboutText);

    useEffect(() => {
        if (aboutText) {
            setSummary(aboutText);
        }
    }, [aboutText]);

    const handleSave = () => {
        onSave(summary);
        onClose();
    };

    const handleChange = (e) => {
        setSummary(e.target.value);
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: styles.overlay,
                content: styles.modal,
            }}
        >
            {/* Header */}
            <div style={styles.header}>
                <span style={styles.modalHeading}>Add Summary</span>
                <button style={styles.closeButton} onClick={onClose}>
                    ×
                </button>
            </div>

            {/* Body */}
            <div style={styles.body}>
                <div style={styles.field}>
                    <label style={styles.label}>Let’s add your summary</label>
                    <textarea
                        style={styles.textarea}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Write a summary to highlight your personality or work experience"
                    />
                </div>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <button style={styles.saveButton} onClick={handleSave}>
                    Save
                </button>
            </div>
        </ReactModal>
    );
};
    const styles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: '9999',
        },
        modal: {
            position: 'relative',
            maxWidth: '46.5rem',
            maxHeight: 'calc(100vh - 100px)',
            margin: 'auto',
            padding: '0',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        },
        modalHeading: {
            fontSize: '20px',
            color: '#313131',
            fontWeight: '700',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 20px',
            borderBottom: '1px solid #e5e5e5',
            backgroundColor: '#fff',
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#333',
        },
        closeButton: {
            background: 'none',
            border: 'none',
            fontSize: '30px',
            lineHeight: '22px',
            cursor: 'pointer',
            color: '#000',
        },
        body: {
            flex: 1,
            overflowY: 'auto',
            padding: '26px 24px',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
        },
        field: {
            width: '100%',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            fontSize: '14px',
            color: '#000000bf',
        },
        textarea: {
            width: '100%',
            height: '164px',
            minHeight: '42px',
            borderRadius: '12px',
            border: '1px solid #ccc',
            padding: '10px',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '1.5',
            color: '#313131',
            resize: 'vertical',
        },
        footer: {
            padding: '12px 20px',
            borderTop: '1px solid #e5e5e5',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'flex-end',
        },
        saveButton: {
            backgroundColor: '#70d4fc',
            borderRadius: '200px',
            padding: '16px 40px',
            fontSize: '16px',
            lineHeight: '18px',
            fontWeight: '500',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
        },
    };

    export default EditAboutModal;
