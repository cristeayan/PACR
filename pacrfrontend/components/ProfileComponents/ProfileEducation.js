import React, { useState } from 'react';
import ReactModal from "react-modal";
import EducationModal from './EditEducationModal';

const ProfileEducation = () => {
    const [educationData, setEducationData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentEducation, setCurrentEducation] = useState(null);
    const [educationToDelete, setEducationToDelete] = useState(null);
    const [modalKey, setModalKey] = useState(0); // Force reset form data on add

    // Handler to open modal for adding new education
    const handleAddEducation = () => {
        setCurrentEducation(null); // Reset for adding new education
        setModalKey((prev) => prev + 1); // Increment key to reset modal
        setIsModalOpen(true);
    };

    // Handler to open modal for editing an existing education entry
    const handleEditEducation = (education) => {
        setCurrentEducation(education); // Pass the current education for editing
        setIsModalOpen(true);
    };

    // Save handler for both adding and editing
    const handleSaveEducation = (newEducation) => {
        setEducationData((prev) => {
            if (currentEducation) {
                // Replace the edited entry
                return prev.map((edu) =>
                    edu === currentEducation ? newEducation : edu
                );
            } else {
                // Add new entry
                return [...prev, newEducation];
            }
        });
        setIsModalOpen(false); // Close modal
    };

    // Open confirmation popup for deleting an education
    const handleOpenDeleteModal = (education) => {
        setEducationToDelete(education);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteEducation = (educationToDelete) => {
        setEducationData((prev) =>
            prev.filter((edu) => edu !== educationToDelete)
        );
        setIsDeleteModalOpen(false); // Close delete confirmation
        setIsModalOpen(false); // Close edit modal if open
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false); // Close delete confirmation
    };

    const renderEducationItem = (education, index) => (
        <div style={styles.educationItem} key={index}>
            <img
                src={education.logo || "postdoctoral_icon.png"} // Default icon if no logo
                alt={`${education.school} Logo`}
                style={styles.educationIcon}
            />
            <div style={styles.educationDetailWrap}>
                <div style={styles.educationTitleWrap}>
                    <p style={styles.educationTitle}>{education.school}</p>
                    <p style={styles.roleTitle}>{education.degree}</p>
                </div>
                <div>
                    <p style={styles.educationLocation}>
                        {education.startMonth} {education.startYear} - {education.endMonth} {education.endYear}
                    </p>
                </div>
            </div>
            {/* Edit Icon for each education */}
            <img
                src="Edit Icon.svg"
                alt="Edit Icon"
                style={styles.aboutEditIcon}
                onClick={() => handleEditEducation(education)}
            />
        </div>
    );

    const renderPlaceholderEducation = () => (
        <div style={styles.placeholderInnerWrap}>
            <img
                src="School_Placeholder_Icon.svg"
                alt="Placeholder Logo"
                style={styles.placeholderIcon}
            />
            <div style={styles.educationDetailWrap}>
                <div style={styles.educationTitleWrap}>
                    <p style={styles.educationTitle}>Your School/University</p>
                    <p style={styles.roleTitle}>Your Degree</p>
                </div>
                <div>
                    <p style={styles.educationLocation}>2016 - 2020</p>
                </div>
            </div>
        </div>
    );

    return (
        <div style={styles.educationContainer}>
            <div style={styles.educationHeadingMainWrap}>
                <h2 style={styles.educationHeading}>Education</h2>
                <div style={styles.aboutEditIconWrap}>
                    {educationData.length > 0 && (
                        <div style={styles.aboutEditIconWrap}>
                            {/* Add Icon */}
                            <img
                                src="Add_Icon.svg"
                                alt="Add Icon"
                                style={styles.addEditIcon}
                                onClick={handleAddEducation}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div style={styles.educationInnerWrap}>
                {educationData.length > 0 ? (
                    educationData.map((education, index) => renderEducationItem(education, index))
                ) : (
                    <>
                        {renderPlaceholderEducation()}
                        <button style={styles.addButton} onClick={handleAddEducation}>
                            Add Education
                        </button>
                    </>
                )}
            </div>
            <EducationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEducation}
                educationData={currentEducation}
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
                        <h2 style={styles.modalHeading}>Delete Education</h2>
                        <button onClick={() => setIsDeleteModalOpen(false)} style={styles.closeButton}>&times;</button>
                    </div>
                    <div style={styles.body}>
                        <p>
                            Are you sure you want to delete this education?
                        </p>
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
                            onClick={() => handleDeleteEducation(educationToDelete)}
                        >
                            Delete
                        </button>
                    </div>
                </ReactModal>
            )}

        </div>
    );
};

const styles = {
    educationContainer: {
        padding: '24px 28px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '5px 4px 16px 0px #0000001C',
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
    },
    educationHeadingMainWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    educationHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '600',
        lineHeight: '28px',
    },
    educationInnerWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '24px',
    },
    educationItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
    },
    educationIcon: {
        width: 'auto',
    },
    educationDetailWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
    },
    educationTitleWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    educationTitle: {
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '18px',
        color: '#313131',
        textTransform: 'capitalize',
    },
    educationLocation: {
        color: '#ADADAD',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        textTransform: 'capitalize',
    },
    roleTitle: {
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '18px',
        color: '#313131',
    },
    aboutEditIconWrap: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: '16px',
        width: 'auto',
        // height: '26px',
        cursor: 'pointer',
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
    addEditIcon: {
        width: '20px',
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
    seeMoreText: {
        fontSize: '12px',
        lineHeight: '16.8px',
        fontWeight: '500',
        letterSpacing: '2%',
        color: '#4fcff5',
        textAlign: 'end',
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

export default ProfileEducation;