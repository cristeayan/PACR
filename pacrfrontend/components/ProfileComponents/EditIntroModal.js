import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const EditIntroModal = ({ isOpen, onClose, user, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        headline: user?.headline || '',
        country: user?.location?.split(', ')[1] || '', // Extract Country
        city: user?.location?.split(', ')[0] || '', // Extract City
        contact: user?.contact || { phone: '', email: '', website: '' },
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.first_name || '',
                lastName: user.last_name || '',
                headline: user.headline || '',
                location: user.location || '',
                contact: {
                    phone: user.contact?.phone || '',
                    email: user.contact?.email || '',
                    website: user.contact?.website || '',
                },
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevFormData) => ({
                ...prevFormData,
                [parent]: {
                    ...prevFormData[parent],
                    [child]: value,
                },
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSave = () => {
        // Combine Country and City into a single location string
        const updatedData = {
            ...formData,
            location: `${formData.city}, ${formData.country}`,
        };
        onSave(updatedData);
        onClose();
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
                <span style={styles.modalHeading}>Edit Intro</span>
                <button style={styles.closeButton} onClick={onClose}>
                    ×
                </button>
            </div>

            {/* Body */}
            <div style={styles.body}>
                <div style={styles.introInfo}>
                <div style={styles.field}>
                    <label style={styles.label}>First Name</label>
                    <input
                        style={styles.input}
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Last Name</label>
                    <input
                        style={styles.input}
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Headline</label>
                    <input
                        style={styles.input}
                        type="text"
                        name="headline"
                        value={formData.headline}
                        onChange={handleInputChange}
                    />
                </div>
                </div>
                {/* Location Fields */}
                <div style={styles.mainWrap}>
                    <h3 style={styles.sectionHeading}>Location</h3>
                    <div style={styles.introInfo}>
                    <div style={styles.field}>
                        <label style={styles.label}>Country/Region</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>City</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    </div>
                </div>

                {/* Contact Info Fields */}
                <div style={styles.mainWrap}>
                    <h3 style={styles.sectionHeading}>Contact Info</h3>
                    <div style={styles.introInfo}>
                    <div style={styles.field}>
                        <label style={styles.label}>Phone</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="phone"
                            value={formData.contact.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={formData.contact.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Website</label>
                        <input
                            style={styles.input}
                            type="url"
                            name="website"
                            value={formData.contact.website}
                            onChange={handleInputChange}
                        />
                    </div>
                    </div>
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
        height: '100vh',
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
        padding: '12px 20px',
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
    introInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    mainWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
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
    input: {
        width: '100%',
        height: '48px',
        borderRadius: '200px',
        border: '0.5px solid #ccc',
        backgroundColor: '#f2f2f2',
        padding: '10px 24px',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '13.2px',
        letterSpacing: '2%',
        color: '#313131',
    },
    sectionHeading: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#313131',
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


export default EditIntroModal;