import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Select from 'react-select';

const EditIntroModal = ({ isOpen, onClose, user, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        headline: user?.headline || '',
        // country: user?.location?.split(', ')[1] || '', // Extract Country
        // city: user?.location?.split(', ')[0] || '', // Extract City
        country: '',
        city: '',
        contact: {
            phone: '',
            showPhone: false,
            email: user?.email || '', // Fetch from user or default to empty
            showEmail: false, // Default to hidden if not explicitly enabled
            website: '',
            showWebsite: false,
        },
    });

    const [countries, setCountries] = useState([]); // List of countries
    const [cities, setCities] = useState([]); // List of cities for the selected country

    useEffect(() => {
        if (user) {
            setFormData({
                contact: {
                    phone: '',
                    showPhone: false,
                    email: user.email || '', // Dynamically populate or leave empty
                    showEmail: false,
                    website: '',
                    showWebsite: false,
                },
            });
        }
    }, [user]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((response) => response.json())
            .then((data) => {
                const countryList = data.map((country) => ({
                    label: country.name.common,
                    value: country.name.common,
                }));
                setCountries(countryList);
            });
    }, []);

    const handleCountryChange = (selectedOption) => {
        setFormData({ ...formData, country: selectedOption.value, city: '' });

        // Fetch cities for the selected country
        fetch(`https://countriesnow.space/api/v0.1/countries/cities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: selectedOption.value }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.error('Error fetching cities:', data.error);
                    setCities([]);
                } else if (data.data) {
                    const cityList = data.data.map((city) => ({
                        label: city,
                        value: city,
                    }));
                    setCities(cityList);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch cities:', error);
                setCities([]);
            });
    };

    const handleCityChange = (selectedOption) => {
        setFormData({ ...formData, city: selectedOption.value });
    };

    if (cities.length === 0 && formData.country) {
        console.warn('No cities available for the selected country.');
    }

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

    // const handleSave = () => {
    //     const updatedData = {
    //         ...formData,
    //         location: `${formData.city}, ${formData.country}`,
    //     };
    //     onSave(updatedData);
    //     onClose();
    // };

    const saveUserData = async (data) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to save user data.');
            }
    
            const result = await response.json();
            console.log('User data saved:', result);
            return result;
        } catch (error) {
            console.error('Error saving user data:', error);
            throw error;
        }
    };

    const handleSave = async () => {
        const updatedData = {
            id: user.id,
            email: formData.contact.email,
            phone_number: formData.contact.phone,
            location: `${formData.city}, ${formData.country}`,
            tagline: formData.headline,
        };
    
        try {
            const savedData = await saveUserData(updatedData);
            console.log('Saved data:', savedData);
            onClose();
        } catch (error) {
            alert('Failed to save user details. Please try again.');
        }
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
                            <Select
                                options={countries}
                                value={countries.find((c) => c.value === formData.country)}
                                onChange={handleCountryChange}
                                placeholder="Type to search country"
                                styles={customStyles}
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>City</label>
                            {formData.country ? (
                                cities.length > 0 ? (
                                    // If cities are available, show the dropdown
                                    <Select
                                        options={cities}
                                        value={cities.find((c) => c.value === formData.city)}
                                        onChange={(selectedOption) => setFormData({ ...formData, city: selectedOption.value })}
                                        placeholder="Type to search city"
                                        styles={customStyles}
                                    />
                                ) : (
                                    // If no cities are available, show a manual input
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        placeholder="Enter city manually"
                                        style={styles.input}
                                    />
                                )
                            ) : (
                                <Select
                                    options={[]}
                                    placeholder="Select country first"
                                    isDisabled={true}
                                    styles={customStyles}
                                />
                            )}

                        </div>
                    </div>
                </div>


                {/* Contact Info Fields */}
                <div style={styles.mainWrap}>
                    <h3 style={styles.sectionHeading}>Contact Info</h3>
                    <div style={styles.introInfo}>

                        <div style={styles.field}>
                        <p style={styles.label}>Email</p>
                            {formData.contact.email ? (
                                <>
                                    <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        {formData.contact.email}
                                    </p>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="contact.showEmail"
                                            checked={formData.contact.showEmail}
                                            onChange={(e) => {
                                                const { name, checked } = e.target;
                                                const [parent, child] = name.split('.');
                                                setFormData((prevFormData) => ({
                                                    ...prevFormData,
                                                    [parent]: {
                                                        ...prevFormData[parent],
                                                        [child]: checked,
                                                    },
                                                }));
                                            }}
                                        />
                                        Show Email
                                    </label>
                                </>
                            ) : (
                                <p style={{ fontSize: '14px', color: '#777' }}>No email found.</p>
                            )}
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Phone</label>
                            <input
                                style={styles.input}
                                type="text"
                                name="contact.phone"
                                value={formData.contact.phone}
                                onChange={handleInputChange}
                            />
                            <label style={styles.checklabel}>
                                <input
                                    type="checkbox"
                                    name="showPhone"
                                    checked={formData.contact.showPhone}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            contact: { ...formData.contact, showPhone: e.target.checked },
                                        })
                                    }
                                />
                                Show phone number
                            </label>
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Website</label>
                            <input
                                style={styles.input}
                                type="url"
                                name="contact.website"
                                value={formData.contact.website}
                                onChange={handleInputChange}
                            />
                            <label style={styles.checklabel}>
                                <input
                                    type="checkbox"
                                    name="showWebsite"
                                    checked={formData.contact.showWebsite}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            contact: { ...formData.contact, showWebsite: e.target.checked },
                                        })
                                    }
                                />
                                Show website link
                            </label>
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
    checklabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        color: '#777',
        marginTop: '10px',
        cursor: 'pointer',
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

const customStyles = {
    control: (provided) => ({
        ...provided,
        width: '100%',
        height: '48px',
        borderRadius: '200px',
        border: '0.5px solid #ccc',
        backgroundColor: '#f2f2f2',
        padding: '0 24px',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '13.2px',
        letterSpacing: '2%',
        color: '#313131',
        boxShadow: 'none',
        '&:hover': { borderColor: '#aaa' }, // Hover effect
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#313131',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#aaa',
    }),
};

export default EditIntroModal;