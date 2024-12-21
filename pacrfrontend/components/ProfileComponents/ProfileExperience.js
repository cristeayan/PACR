import React, { useState } from 'react';
import ReactModal from "react-modal";
import ExperienceModal from "./EditExperienceModal";

const ProfileExperience = () => {
    const [experienceData, setExperienceData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentExperience, setCurrentExperience] = useState(null);
    const [experienceToDelete, setExperienceToDelete] = useState(null);
    const [modalKey, setModalKey] = useState(0);

    const handleAddExperience = () => {
        setCurrentExperience(null);
        setIsModalOpen(true);
        setModalKey(modalKey + 1); // Reset the modal
    };

    const handleEditExperience = (experience) => {
        setCurrentExperience(experience);
        setIsModalOpen(true);
        setModalKey(modalKey + 1);
    };

    const handleSaveExperience = (experience) => {
        if (currentExperience) {
            // Edit mode
            setExperienceData((prev) =>
                prev.map((item) =>
                    item.id === currentExperience.id ? { ...item, ...experience } : item
                )
            );
        } else {
            // Add mode
            setExperienceData((prev) => [...prev, { ...experience, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteExperience = (id) => {
        setExperienceData((prev) => prev.filter((item) => item.id !== id));
        setIsDeleteModalOpen(false);
    };

    const handleOpenDeleteModal = (experience) => {
        setExperienceToDelete(experience);
        setIsDeleteModalOpen(true);
    };

    const calculateDuration = (startYear, startMonth, endYear, endMonth) => {
        // Convert month names to numerical values if necessary
        const monthMap = {
            January: 0,
            February: 1,
            March: 2,
            April: 3,
            May: 4,
            June: 5,
            July: 6,
            August: 7,
            September: 8,
            October: 9,
            November: 10,
            December: 11,
        };

        const start = new Date(startYear, monthMap[startMonth]);
        const end = endYear ? new Date(endYear, monthMap[endMonth]) : new Date();

        const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;

        return `${years > 0 ? `${years} yr${years > 1 ? "s" : ""} ` : ""}${months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : ""
            }`.trim();
    };


    const renderExperienceItem = (experience) => (
        <div style={styles.experienceItem} key={experience.id}>
            <img
                src={experience.logo || "postdoctoral_icon.png"}
                alt="Experience Logo"
                style={styles.experienceIcon}
            />
            <div style={styles.experienceDetailWrap}>
                <div style={styles.experienceTitleWrap}>
                    <p style={styles.experienceTitle}>{experience.title}</p>
                    <p>
                        {experience.company} ·{" "}
                        <span style={styles.experienceDetails}>{experience.employmentType}</span>
                    </p>
                    <p style={styles.experienceDetails}>
                        {experience.startMonth} {experience.startYear} - {experience.endMonth} {experience.endYear || "Present"} ·{" "}
                        <span>{calculateDuration(experience.startYear, experience.startMonth, experience.endYear, experience.endMonth)}</span>
                    </p>

                </div>
                <p style={styles.experienceLocation}>
                    {experience.location} · <span>{experience.locationType}</span>
                </p>
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
        <div style={styles.placeholderInnerWrap}>
            <img
                src="School_Placeholder_Icon.svg"
                alt="Placeholder Icon"
                style={styles.placeholderIcon}
            />
            <div style={styles.experienceDetailWrap}>
                <div style={styles.experienceTitleWrap}>
                    <p style={styles.experienceTitle}>Job Title</p>
                    <p style={styles.roleTitle}>Organization</p>
                </div>
                <p style={styles.experienceDetails}>2023 - Present</p>
            </div>
        </div>
    );

    return (
        <div style={styles.experienceContainer}>
            <div style={styles.experienceHeadingMainWrap}>
                <h2 style={styles.experienceHeading}>Experience</h2>
                <div style={styles.aboutEditIconWrap}>
                    {experienceData.length > 0 && (
                        <img
                            src="Add_Icon.svg"
                            alt="Add Icon"
                            style={styles.addEditIcon}
                            onClick={handleAddExperience}
                        />
                    )}
                </div>
            </div>

            <div style={styles.experienceInnerWrap}>
                {experienceData.length > 0 ? (
                    experienceData.map((experience) => renderExperienceItem(experience))
                ) : (
                    <>
                        {renderPlaceholderExperience()}
                        <button style={styles.addButton} onClick={handleAddExperience}>
                            Add Experience
                        </button>
                    </>
                )}
            </div>

            <ExperienceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveExperience}
                experienceData={currentExperience}
                onDelete={handleOpenDeleteModal}
                key={modalKey}
            />

            {isDeleteModalOpen && (
                <ReactModal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={() => setIsDeleteModalOpen(false)}
                    style={{
                        overlay: styles.modalOverlay,
                        content: styles.modalDeleteContent,
                    }}
                >
                    <div style={styles.header}>
                        <h2 style={styles.modalHeading}>Delete Experience</h2>
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            style={styles.closeButton}
                        >
                            &times;
                        </button>
                    </div>
                    <div style={styles.body}>
                        <p>Are you sure you want to delete this experience?</p>
                    </div>
                    <div style={styles.footer}>
                        <button
                            style={styles.cancelButton}
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            No thanks
                        </button>
                        <button
                            style={styles.deleteModalButton}
                            onClick={() => handleDeleteExperience(experienceToDelete.id)}
                        >
                            Delete
                        </button>
                    </div>
                </ReactModal>
            )}

            {/* <div style={styles.experienceItem}>
                    <img src="/firebase_icon.png" alt="Beth Israel Logo" style={styles.experienceIcon} />
                    <div style={styles.experienceDetailWrap}>
                        <div style={styles.experienceTitleWrap}>
                            <p style={styles.experienceTitle}>Beth Israel Deaconess Medical Center</p>
                            <p style={styles.experienceDetails}>Full Time · 8 Months</p>
                        </div>
                        <div>
                            <p style={styles.experienceLocation}>Boston, Massachusetts, United States Of America</p>
                        </div>
                        <div style={styles.experienceRoles}>
                            <div style={styles.experienceInnerRoles}>
                                <div style={styles.rolesWrap}>
                                    <p style={styles.roleTitle}>Clinical Observership</p>
                                    <p style={styles.roleDetails}>March 2024 - Present · 8 Months</p>
                                </div>
                                <div style={styles.rolesWrap}>
                                    <p style={styles.roleTitle}>Postdoctoral Research Fellow</p>
                                    <p style={styles.roleDetails}>March 2024 - Present · 8 Months · On-Site</p>
                                </div>
                            </div>
                            <div style={styles.rolesDescriptionWrap}>
                                <p style={styles.roleDescription}>Postdoctoral Research Fellow - Department Of Gastroenterology</p>
                                <div style={styles.experienceImages}>
                                    <img src="/experience_dummy_1.png" alt="Experience Image 1" style={styles.experienceImage} />
                                    <img src="/experience_dummy_2.png" alt="Experience Image 2" style={styles.experienceImage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

            {/* <p style={styles.seeMoreText}>...See More</p> */}
        </div>
    );
};



const styles = {
    experienceContainer: {
        padding: '24px 28px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '5px 4px 16px 0px #0000001C',
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
    },

    experienceHeadingMainWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    experienceHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '600',
        lineHeight: '28px',
    },

    experienceInnerWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '24px',
    },

    experienceItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
    },

    experienceIcon: {
        width: 'auto',
    },

    experienceDetailWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
    },

    experienceTitleWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },

    experienceTitle: {
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '18px',
        color: '#313131',
        textTransform: 'capitalize',
    },

    experienceDetails: {
        color: '#ADADAD',
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '400',
        textTransform: 'capitalize',
    },

    experienceLocation: {
        color: '#ADADAD',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        textTransform: 'capitalize',
    },

    experienceRoles: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },

    experienceInnerRoles: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },

    rolesWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },

    roleTitle: {
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '18px',
        color: '#313131',
    },

    roleDetails: {
        color: '#ADADAD',
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '400',
    },

    rolesDescriptionWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },

    roleDescription: {
        fontSize: '16px',
        lineHeight: '18px',
        fontWeight: '400',
        color: '#313131',
    },

    experienceImages: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },

    experienceImage: {
        width: 'auto',
        height: 'auto',
        borderRadius: '6px',
        objectFit: 'cover',
    },

    seeMoreText: {
        fontSize: '12px',
        lineHeight: '16.8px',
        fontWeight: '500',
        letterSpacing: '2%',
        color: '#4fcff5',
        textAlign: 'end',
    },

    aboutEditIconWrap: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: '16px',
        width: 'auto',
        cursor: 'pointer',
    },

    addEditIcon: {
        width: '20px',
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