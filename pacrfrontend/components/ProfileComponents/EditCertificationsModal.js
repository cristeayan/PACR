import { useState, useEffect } from 'react';
import ReactModal from "react-modal";

const CertificationModal = ({ isOpen, onClose, onSave, certificationData, onDelete }) => {
    const initialFormData = {
        certificationName: "",
        issuingOrganization: "",
        issueMonth: "",
        issueYear: "",
        expirationMonth: "",
        expirationYear: "",
        skills: [],
        logo: "postdoctoral_icon.png",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [skillInput, setSkillInput] = useState("");

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

    useEffect(() => {
        if (certificationData) {
            setFormData(certificationData);
        } else {
            setFormData(initialFormData);
        }
    }, [certificationData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSkillInput = (e) => {
        setSkillInput(e.target.value);
    };

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }));
        }
        setSkillInput("");
    };

    const removeSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove),
        }));
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
                <h2 style={styles.modalHeading}>{certificationData ? "Edit Certification" : "Add Certification"}</h2>
                <button onClick={onClose} style={styles.closeButton}>&times;</button>
            </div>
            <div style={styles.body}>
                <div style={styles.field}>
                    <label style={styles.label}>Certification Name</label>
                    <input
                        type="text"
                        name="certificationName"
                        value={formData.certificationName}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Enter certification name"
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Issuing Organization</label>
                    <input
                        type="text"
                        name="issuingOrganization"
                        value={formData.issuingOrganization}
                        onChange={handleInputChange}
                        style={styles.input}
                        placeholder="Enter issuing organization"
                    />
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Issue Date</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                            name="issueMonth"
                            value={formData.issueMonth}
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
                            name="issueYear"
                            value={formData.issueYear}
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
                    <label style={styles.label}>Expiration Date</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                            name="expirationMonth"
                            value={formData.expirationMonth}
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
                            name="expirationYear"
                            value={formData.expirationYear}
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
                    <label style={styles.label}>Skills</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            value={skillInput}
                            onChange={handleSkillInput}
                            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                            style={styles.input}
                            placeholder="Type a skill and press Enter"
                        />
                    </div>
                    <div style={styles.tags}>
                        {formData.skills.map((skill, index) => (
                            <span key={index} style={styles.tag}>
                                {skill}
                                <button onClick={() => removeSkill(skill)} style={styles.removeButton}>
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div style={styles.footer}>
                {certificationData && (
                    <button
                        style={styles.deleteModalButton}
                        onClick={() => onDelete(certificationData)}
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

    tag: {
        display: "inline-block",
        padding: "5px 10px",
        margin: "4px",
        borderRadius: "16px",
        backgroundColor: "#eef3f8",
        fontSize: "14px",
        color: "#4a4a4a",
        position: "relative",
    },
    removeButton: {
        border: "none",
        background: "none",
        color: "#888",
        fontWeight: "bold",
        cursor: "pointer",
        marginLeft: "8px",
    },
    tags: {
        marginTop: "10px",
        display: "flex",
        alignItems: 'center',
        flexWrap: "wrap",
        gap: "2px",
    },
};

export default CertificationModal;