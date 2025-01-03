import { useState, useEffect } from 'react';
import ReactModal from "react-modal";

const ExperienceModal = ({ isOpen, onClose, onSave, experienceData, onDelete }) => {
    const initialFormData = {
        position: "",
        company: "",
        employee_type: "",
        location: "",
        department: "",
        job_type: "",
        start_month: "",
        start_year: "",
        end_month: "",
        end_year: "",
        description: "",
        is_current: false,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [locationOptions, setLocationOptions] = useState([]);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);

    const employee_types = [
        "Please select",
        "Full-time",
        "Part-time",
        "Self-employed",
        "Freelance",
        "Contract",
        "Internship",
        "Apprenticeship",
        "Seasonal",
    ];

    const job_types = [
        { label: "On-site", value: "on_site" },
        { label: "Hybrid", value: "hybrid" },
        { label: "Remote", value: "remote" }
    ];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

    useEffect(() => {
        if (experienceData) {
            setFormData({
                ...experienceData,
                job_type: experienceData.job_type || "on_site", // Default to on_site
            });
        } else {
            setFormData(initialFormData);
        }
    }, [experienceData]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "location") {
            fetchLocationSuggestions(value);
            setShowLocationDropdown(true);
        }
    };

    const handleCheckboxChange = () => {
        setFormData((prev) => ({
            ...prev,
            is_current: !prev.is_current,
            end_month: "",
            end_year: "",
        }));
    };

    const fetchLocationSuggestions = async (query) => {
        if (query.length < 2) {
            setLocationOptions([]);
            return;
        }
        try {
            const response = await fetch(`https://api.locationiq.com/v1/autocomplete?key=YOUR_API_KEY&q=${query}`);
            const data = await response.json();
            const suggestions = data.map((item) => ({
                name: `${item.address.name}, ${item.address.country}`,
            }));
            setLocationOptions(suggestions);
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
            setLocationOptions([]);
        }
    };

    const selectOption = (type, value) => {
        setFormData((prev) => ({
            ...prev,
            [type]: value,
        }));
        if (type === "location") setShowLocationDropdown(false);
    };

    const calculateDuration = () => {
        if (formData.start_month && formData.start_year) {
            const startDate = new Date(formData.start_year, months.indexOf(formData.start_month));
            const endDate = formData.is_current
                ? new Date()
                : formData.end_year && formData.end_month
                    ? new Date(formData.end_year, months.indexOf(formData.end_month))
                    : null;

            if (endDate && endDate > startDate) {
                const diffYears = endDate.getFullYear() - startDate.getFullYear();
                const diffMonths = endDate.getMonth() - startDate.getMonth();
                return `${diffYears} years, ${Math.abs(diffMonths)} months`;
            }
        }
        return "";
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
                <h2 style={styles.modalHeading}>{experienceData ? "Edit Experience" : "Add Experience"}</h2>
                <button onClick={onClose} style={styles.closeButton}>&times;</button>
            </div>
            <div style={styles.body}>
                <div style={styles.field}>
                    <label style={styles.label}>position</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Enter your role position"
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Company Name</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Enter company name"
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Employment Type</label>
                    <select
                        name="employee_type"
                        value={formData.employee_type}
                        onChange={handleInputChange}
                        style={styles.input}
                    >
                        {employee_types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Enter city"
                    />
                    {showLocationDropdown && locationOptions.length > 0 && (
                        <div style={styles.dropdown}>
                            {locationOptions.map((location) => (
                                <div
                                    key={location.name}
                                    style={styles.dropdownItem}
                                    onClick={() => selectOption("location", location.name)}
                                >
                                    {location.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Department</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Enter department name"
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Location Type</label>
                    <select
                        name="job_type"
                        value={formData.job_type}
                        onChange={handleInputChange}
                        style={styles.input}
                    >
                        <option value="">Please select</option>
                        {job_types.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Start Date</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <select
                            name="start_month"
                            value={formData.start_month}
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
                            name="start_year"
                            value={formData.start_year}
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
                    <label style={styles.workingCheckboxLabel}>
                        <input
                            type="checkbox"
                            checked={formData.is_current}
                            onChange={handleCheckboxChange}
                        />
                        I am currently working in this role
                    </label>
                </div>
                {!formData.is_current && (
                    <div style={styles.field}>
                        <label style={styles.label}>End Date</label>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <select
                                name="end_month"
                                value={formData.end_month}
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
                                name="end_year"
                                value={formData.end_year}
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
                )}
                <div style={styles.field}>
                    <span>Duration: {calculateDuration()}</span>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        style={styles.textarea}
                        placeholder="Describe your role and responsibilities"
                        maxLength="2000"
                    />
                </div>
            </div>
            <div style={styles.footer}>
                {experienceData && (
                    <button
                        style={styles.deleteModalButton}
                        onClick={() => onDelete(experienceData)}
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
    workingCheckboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
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

export default ExperienceModal;