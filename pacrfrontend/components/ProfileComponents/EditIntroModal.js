import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Select from 'react-select';

const EditIntroModal = ({ isOpen, onClose, user, token, onSave, setUserAndToken }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        country: '',
        city: '',
        tagline: '',
        website: '',
        email_vis: false,
        phone_vis: false,
        website_vis: false,
    });

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    // Populate formData with user information
    useEffect(() => {
        if (user) {
            const locationParts = user.location ? user.location.split(',').map(part => part.trim()) : ['', ''];
            const [city, country] = locationParts.length === 2 ? locationParts : [locationParts[0], ''];
            
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone_number: user.phone_number || '',
                date_of_birth: user.date_of_birth || '',
                country: country || '',
                city: city || '',
                tagline: user.tagline || '',
                website: user.website || '',
                email_vis: user.email_vis || false,
                phone_vis: user.phone_vis || false,
                website_vis: user.website_vis || false,
            });

            setCities((prevCities) => [
                ...prevCities,
                { label: city, value: city }
            ]);
        }
    }, [user]);

    // Fetch countries on component mount
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async () => {
        const updatedData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone_number: formData.phone_number,
            date_of_birth: formData.date_of_birth,
            location: `${formData.city}, ${formData.country}`, // Combine city and country
            tagline: formData.tagline,
            website: formData.website,
            email_vis: formData.email_vis,
            phone_vis: formData.phone_vis,
            website_vis: formData.website_vis,
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to save user data.');
            }

            const updatedUser = await response.json();
            setUserAndToken(updatedUser, token);
            onSave(updatedUser);
            onClose();
        } catch (error) {
            console.error(error);
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
            <div style={styles.header}>
                <span style={styles.modalHeading}>Edit Intro</span>
                <button style={styles.closeButton} onClick={onClose}>
                    ×
                </button>
            </div>

            <div style={styles.body}>
                <div style={styles.scrollableContent}>
                    <div style={styles.field}>
                        <label style={styles.label}>First Name</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Last Name</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div style={styles.field}>
                        <label style={styles.label}>Tagline</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="email_vis"
                                checked={formData.email_vis}
                                onChange={handleInputChange}
                            />
                            Show Email
                        </label>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Phone Number</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="phone_vis"
                                checked={formData.phone_vis}
                                onChange={handleInputChange}
                            />
                            Show Phone Number
                        </label>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Date of Birth</label>
                        <input
                            style={styles.input}
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Country</label>
                        <Select
                            options={countries}
                            value={countries.find((c) => c.value === formData.country)}
                            onChange={handleCountryChange}
                            placeholder="Select a country"
                            styles={customStyles}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>City</label>
                        <Select
                            options={cities}
                            value={cities.find((c) => c.value === formData.city)}
                            onChange={handleCityChange}
                            placeholder="Select a city"
                            styles={customStyles}
                        />
                    </div>


                    <div style={styles.field}>
                        <label style={styles.label}>Website</label>
                        <input
                            style={styles.input}
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="website_vis"
                                checked={formData.website_vis}
                                onChange={handleInputChange}
                            />
                            Show Website
                        </label>
                    </div>
                </div>
            </div>

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
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 20px',
        borderBottom: '1px solid #e5e5e5',
        backgroundColor: '#fff',
    },
    modalHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '700',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '30px',
        cursor: 'pointer',
    },
    body: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        maxHeight: 'calc(100vh - 200px)',

    },
   
    field: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    footer: {
        padding: '12px 20px',
        borderTop: '1px solid #e5e5e5',
        backgroundColor: '#fff',
        textAlign: 'right',
    },
    saveButton: {
        backgroundColor: '#70d4fc',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        border: 'none',
        borderRadius: '40px',
        cursor: 'pointer',
    },
};

const customStyles = {
    control: (provided) => ({
        ...provided,
        width: '100%',
        padding: '10px',
    }),
};

export default EditIntroModal;
