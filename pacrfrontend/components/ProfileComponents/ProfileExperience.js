import React, { useState, useEffect } from 'react';
import ReactModal from "react-modal";
import ExperienceModal from "./EditExperienceModal";
import { useUser } from '../../context/UserContext';

const ProfileExperience = () => {
    const [experienceData, setExperienceData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentExperience, setCurrentExperience] = useState(null);
    const [modalKey, setModalKey] = useState(0);
    const { token } = useUser();

    // Fetch experiences from API
    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/job-experiences/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setExperienceData(data);
                } else {
                    console.error('Failed to fetch experiences');
                }
            } catch (error) {
                console.error('Error fetching experiences:', error);
            }
        };
        fetchExperiences();
    }, [token]);

    const handleAddExperience = () => {
        setCurrentExperience(null);
        setIsModalOpen(true);
        setModalKey(modalKey + 1);
    };

    const handleEditExperience = (experience) => {
        setCurrentExperience(experience);
        setIsModalOpen(true);
        setModalKey(modalKey + 1);
    };

    const handleSaveExperience = async (experience) => {
        try {
            const method = currentExperience ? 'PATCH' : 'POST';
            const url = currentExperience
                ? `http://127.0.0.1:8000/api/job-experiences/${currentExperience.id}/`
                : 'http://127.0.0.1:8000/api/job-experiences/';

            const formData = new FormData();
            formData.append('company', experience.company);
            formData.append('position', experience.position);
            formData.append('location', experience.location); // New field
            formData.append('department', experience.department); // New field
            formData.append('start_month', experience.start_month);
            formData.append('start_year', experience.start_year);
            formData.append('end_month', experience.end_month || '');
            formData.append('end_year', experience.end_year || '');
            formData.append('is_current', experience.is_current);
            formData.append('description', experience.description || '');
            formData.append('employmee_type', experience.employmee_type);
            formData.append('job_type', experience.job_type);

            if (experience.media && experience.media.length > 0) {
                experience.media.forEach((file) => {
                    formData.append('media', file);
                });
            }

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to save experience');
            }

            const updatedExperience = await response.json();
            if (currentExperience) {
                setExperienceData((prev) =>
                    prev.map((item) =>
                        item.id === currentExperience.id ? updatedExperience : item
                    )
                );
            } else {
                setExperienceData((prev) => [...prev, updatedExperience]);
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving experience:', error);
        }
    };

    const calculateDuration = (startYear, endYear) => {
        const totalYears = endYear ? endYear - startYear : new Date().getFullYear() - startYear;
        return `${totalYears} year${totalYears > 1 ? 's' : ''}`;
    };

    const renderExperienceItem = (experience) => (
        <div style={styles.experienceItem} key={experience.id}>
            <img
                src={experience.company_logo || "placeholder_icon.png"}
                alt="Experience Logo"
                style={styles.experienceIcon}
            />
            <div style={styles.experienceDetailWrap}>
                <div style={styles.experienceTitleWrap}>
                    <p style={styles.experienceTitle}>{experience.position}</p>
                    <p>
                        {experience.company.name} ·
                        <span style={styles.experienceDetails}>{experience.employmee_type}</span>
                    </p>
                    <p style={styles.experienceDetails}>
                        {experience.start_year} - {experience.end_year || "Present"} ·
                        <span>{calculateDuration(experience.start_year, experience.end_year)}</span>
                    </p>
                </div>
                <p style={styles.roleDescription}>{experience.description}</p>
            </div>
            <img
                src="Edit Icon.svg"
                alt="Edit Icon"
                style={styles.aboutEditIcon}
                onClick={() => handleEditExperience(experience)}
            />
        </div>
    );

    const renderPlaceholderExperience = () => (
        <div style={styles.placeholderWrap}>
            <p style={styles.placeholderText}>No experience added yet. Start by adding your experience!</p>
            <button style={styles.addButton} onClick={handleAddExperience}>Add Experience</button>
        </div>
    );

    return (
        <div style={styles.experienceContainer}>
            <div style={styles.experienceHeadingMainWrap}>
                <h2 style={styles.experienceHeading}>Experience</h2>
                <img
                    src="Add_Icon.svg"
                    alt="Add Icon"
                    style={styles.addEditIcon}
                    onClick={handleAddExperience}
                />
            </div>

            <div style={styles.experienceInnerWrap}>
                {experienceData.length > 0 ? (
                    experienceData.map((experience) => renderExperienceItem(experience))
                ) : (
                    renderPlaceholderExperience()
                )}
            </div>

            <ExperienceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveExperience}
                experienceData={currentExperience}
                key={modalKey}
            />
        </div>
    );
};

const styles = {
    experienceContainer: {
        padding: '32px 28px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '5px 4px 16px 0px #0000001C',
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
    },
    experienceHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '600',
        lineHeight: '28px',
    },
    experienceItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
    },
    experienceIcon: {
        width: 'auto',
    },
    experienceTitle: {
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '18px',
        color: '#313131',
    },
    roleDescription: {
        fontSize: '16px',
        lineHeight: '18px',
        fontWeight: '400',
        color: '#313131',
    },
    addButton: {
        backgroundColor: '#70d4fc',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        border: 'none',
        borderRadius: '40px',
        cursor: 'pointer',
    },

    aboutEditIcon: {
        width: '26px',
        cursor: 'pointer',
    },

    placeholderInnerWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '16px',
    },

    placeholderIcon: {
        width: '28px',
    },

    modalOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999',
    },
    modalDeleteContent: {
        position: 'relative',
        background: '#fff',
        border: 'none',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '336px',
        padding: '0',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
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
        fontSize: '18px',
        lineHeight: '22px',
        color: '#313131',
        fontWeight: '700',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '30px',
        lineHeight: '28px',
        cursor: 'pointer',
    },
    body: {
        padding: '20px',
    },
    cancelButton: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '500',
        backgroundColor: '#fff',
        color: '#4FCFF5',
        textDecoration: 'none',
        padding: '12px 20px',
        borderRadius: '200px',
        textAlign: 'center',
        border: '1px solid #4FCFF5',
        cursor: 'pointer',
    },
    deleteModalButton: {
        backgroundColor: '#70d4fc',
        borderRadius: '200px',
        padding: '12px 20px',
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '500',
        border: 'none',
        color: '#fff',
        border: '1px solid #4FCFF5',
        cursor: 'pointer',
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
};

export default ProfileExperience;
