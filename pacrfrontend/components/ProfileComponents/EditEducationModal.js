import { useState, useEffect } from 'react';
import ReactModal from "react-modal";

const EducationModal = ({ isOpen, onClose, onSave, educationData, onDelete }) => {
    const initialFormData = {
        school: "",
        degree: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        logo: "postdoctoral_icon.png",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [schoolOptions, setSchoolOptions] = useState([]);
    const [degreeOptions, setDegreeOptions] = useState([]);
    const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
    const [showDegreeDropdown, setShowDegreeDropdown] = useState(false);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

    // Populate fields if editing
    useEffect(() => {
        if (educationData) {
            setFormData(educationData);
        } else {
            setFormData(initialFormData);
        }
    }, [educationData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "school") {
            fetchSchoolSuggestions(value);
            setShowSchoolDropdown(true);
        } else if (name === "degree") {
            fetchDegreeSuggestions(value);
            setShowDegreeDropdown(true);
        }
    };

    const fetchSchoolSuggestions = async (query) => {
        if (query.length < 2) {
            setSchoolOptions([]);
            return;
        }
        try {
            const response = await fetch(`https://api.linkedin.com/v2/schools?query=${query}`, {
                headers: {
                    'Authorization': `Bearer YOUR_API_TOKEN`,
                },
            });
            const data = await response.json();
            const suggestions = data.elements.map((school) => ({
                name: school.name,
                logo: school.logo || "default-logo.png",
            }));
            setSchoolOptions(suggestions);
        } catch (error) {
            console.error("Error fetching school suggestions:", error);
            setSchoolOptions([]);
        }
    };

    const fetchDegreeSuggestions = async (query) => {
        if (query.length < 2) {
            setDegreeOptions([]);
            return;
        }
        try {
            const response = await fetch(`https://api.linkedin.com/v2/degrees`, {
                headers: {
                    'X-Api-Key': 'YOUR_API_KEY',
                },
            });
            const data = await response.json();
            const suggestions = data.data.map((item) => item.value);
            setDegreeOptions(suggestions);
        } catch (error) {
            console.error("Error fetching degree suggestions:", error);
        }
    };

    const selectOption = (type, value) => {
        setFormData((prev) => ({
            ...prev,
            [type]: value,
        }));
        if (type === "school") setShowSchoolDropdown(false);
        if (type === "degree") setShowDegreeDropdown(false);
    };

    const handleSave = () => {
        onSave(formData);
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
            <div style={styles.header}>
                <h2 style={styles.modalHeading}>{educationData ? "Edit Education" : "Add Education"}</h2>
                <button onClick={onClose} style={styles.closeButton}>&times;</button>
            </div>
            <div style={styles.body}>
                <div style={styles.field}>
                    <label style={styles.label}>School/University</label>
                    <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Search for schools/universities"
                    />
                    {showSchoolDropdown && schoolOptions.length > 0 && (
                        <div style={styles.dropdown}>
                            {schoolOptions.map((school) => (
                                <div
                                    key={school.name}
                                    style={styles.dropdownItem}
                                    onClick={() => selectOption("school", school.name)}
                                >
                                    <img
                                        src={school.logo || "default-logo.png"}
                                        alt=""
                                        style={{ width: "20px", marginRight: "10px" }}
                                    />
                                    {school.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Degree</label>
                    <input
                        type="text"
                        name="degree"
                        value={formData.degree}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Search for degrees"
                    />
                    {showDegreeDropdown && degreeOptions.length > 0 && (
                        <div style={styles.dropdown}>
                            {degreeOptions.map((degree) => (
                                <div
                                    key={degree}
                                    style={styles.dropdownItem}
                                    onClick={() => selectOption("degree", degree)}
                                >
                                    {degree}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Start Date</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                            name="startMonth"
                            value={formData.startMonth}
                            onChange={handleInputChange}
                            style={styles.input}
                        >
                            <option value="">Month</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            name="startYear"
                            value={formData.startYear}
                            onChange={handleInputChange}
                            style={styles.input}
                        >
                            <option value="">Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>End Date</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                            name="endMonth"
                            value={formData.endMonth}
                            onChange={handleInputChange}
                            style={styles.input}
                        >
                            <option value="">Month</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            name="endYear"
                            value={formData.endYear}
                            onChange={handleInputChange}
                            style={styles.input}
                        >
                            <option value="">Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div style={styles.footer}>
                {educationData && (
                    <button
                        style={styles.deleteModalButton}
                        onClick={() => onDelete(educationData)}
                    >
                        Delete
                    </button>
                )}


                <button onClick={handleSave} style={styles.saveButton}>
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
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        maxHeight: '150px',
        overflowY: 'auto',
        zIndex: '1000',
        width: 'calc(100% - 20px)',
    },
    dropdownItem: {
        padding: '8px',
        cursor: 'pointer',
        borderBottom: '1px solid #e5e5e5',
    },
    footer: {
        padding: '12px 20px',
        borderTop: '1px solid #e5e5e5',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
    },
    deleteModalButton: {
        backgroundColor: 'transparent',
        border: '1px solid #70d4fc',
        borderRadius: '200px',
        padding: '10px 20px',
        fontSize: '16px',
        lineHeight: '18px',
        fontWeight: '500',
        color: '#70d4fc',
        cursor: 'pointer',
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

export default EducationModal;