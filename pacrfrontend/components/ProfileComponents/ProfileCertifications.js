import React, { useState } from 'react';
import ReactModal from "react-modal";
import CertificationModal from './EditCertificationsModal';

const ProfileCertifications = () => {
    const [certificationsData, setCertificationsData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentCertification, setCurrentCertification] = useState(null);
    const [certificationToDelete, setCertificationToDelete] = useState(null);
    const [modalKey, setModalKey] = useState(0); // To force modal reset

    // Handler to open modal for adding new certification
    const handleAddCertification = () => {
        setCurrentCertification(null); // Reset for new certification
        setModalKey((prev) => prev + 1); // Increment to reset form
        setIsModalOpen(true);
    };

    // Handler to open modal for editing an existing certification
    const handleEditCertification = (certification) => {
        setCurrentCertification(certification); // Pass current data
        setIsModalOpen(true);
    };

    // Save handler for adding/editing
    const handleSaveCertification = (newCertification) => {
        setCertificationsData((prev) => {
            if (currentCertification) {
                // Edit existing entry
                return prev.map((cert) =>
                    cert === currentCertification ? newCertification : cert
                );
            } else {
                // Add new entry
                return [...prev, newCertification];
            }
        });
        setIsModalOpen(false); // Close modal
    };

    // Open delete confirmation modal
    const handleOpenDeleteModal = (certification) => {
        setCertificationToDelete(certification);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteCertification = (certificationToDelete) => {
        setCertificationsData((prev) =>
            prev.filter((cert) => cert !== certificationToDelete)
        );
        setIsDeleteModalOpen(false);
        setIsModalOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const renderCertificationItem = (certification, index) => (
        <div style={styles.certificationsItem} key={index}>
            <div style={styles.certificationLeftWrap}>
                <img
                    src={certification.logo || "postdoctoral_icon.png"} // Default icon
                    alt={`${certification.certificationName} Logo`}
                    style={styles.certificationsIcon}
                />
                <div style={styles.certificationsDetailWrap}>
                    <div style={styles.certificationsTitleWrap}>
                        <p style={styles.certificationsTitle}>{certification.certificationName}</p>
                        <p style={styles.certificationsTitle}>{certification.issuingOrganization}</p>
                        <p style={styles.certificationsLocation}>
                            Issued {certification.issueMonth} {certification.issueYear} - Expires {certification.expirationMonth} {certification.expirationYear}
                        </p>
                    </div>
                    {certification.skills.length > 0 && (
                        <p style={styles.certificationsTitle}>
                            <span style={styles.boldText}>Skills:</span> {certification.skills.join(", ")}
                        </p>
                    )}
                </div>
            </div>
            <img
                src="Edit Icon.svg"
                alt="Edit Icon"
                style={styles.aboutEditIcon}
                onClick={() => handleEditCertification(certification)}
            />
        </div>
    );

    const renderPlaceholderCertification = () => (
        <div style={styles.placeholderInnerWrap}>
            <img
                src="School_Placeholder_Icon.svg"
                alt="Placeholder Logo"
                style={styles.placeholderIcon}
            />
            <div style={styles.certificationsDetailWrap}>
                <div style={styles.certificationsTitleWrap}>
                    <p style={styles.certificationsTitle}>Your Certification Name</p>
                    <p style={styles.certificationsTitle}>Issuing Organization</p>
                    <p style={styles.certificationsLocation}>Issued Date</p>
                </div>
            </div>
        </div>
    );

    return (
        <div style={styles.certificationsContainer}>
            <div style={styles.certificationsHeadingMainWrap}>
                <h2 style={styles.certificationsHeading}>Licenses / Certifications</h2>
                <div style={styles.aboutEditIconWrap}>
                    {certificationsData.length > 0 && (
                        <img
                            src="Add_Icon.svg"
                            alt="Add Icon"
                            style={styles.addEditIcon}
                            onClick={handleAddCertification}
                        />
                    )}
                </div>
            </div>

            <div style={styles.certificationsInnerWrap}>
                {certificationsData.length > 0 ? (
                    certificationsData.map((certification, index) =>
                        renderCertificationItem(certification, index)
                    )
                ) : (
                    <>
                        {renderPlaceholderCertification()}
                        <button style={styles.addButton} onClick={handleAddCertification}>
                            Add Certification
                        </button>
                    </>
                )}
            </div>

            <CertificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveCertification}
                certificationData={currentCertification}
                onDelete={handleOpenDeleteModal}
                key={modalKey}
            />

            {isDeleteModalOpen && (
                <ReactModal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={handleCloseDeleteModal}
                    style={{
                        overlay: styles.modalOverlay,
                        content: styles.modalDeleteContent,
                    }}
                >
                    <div style={styles.header}>
                        <h2 style={styles.modalHeading}>Delete Certification</h2>
                        <button onClick={handleCloseDeleteModal} style={styles.closeButton}>&times;</button>
                    </div>
                    <div style={styles.body}>
                        <p>
                            Are you sure you want to delete this certification?
                        </p>
                    </div>
                    <div style={styles.footer}>
                        <button
                            style={styles.cancelButton}
                            onClick={handleCloseDeleteModal}
                        >
                            No thanks
                        </button>
                        <button
                            style={styles.deleteModalButton}
                            onClick={() => handleDeleteCertification(certificationToDelete)}
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
    certificationsContainer: {
        padding: '24px 28px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '5px 4px 16px 0px #0000001C',
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
    },

    certificationsHeadingMainWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    certificationsHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '600',
        lineHeight: '28px',
    },

    certificationsInnerWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '24px',
    },

    certificationsItem: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px',
        width: '100%',
    },

    certificationLeftWrap: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
    },

    certificationsIcon: {
        width: 'auto',
    },

    certificationsDetailWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
    },

    certificationsTitleWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },

    certificationsTitle: {
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '18px',
        color: '#313131',
        textTransform: 'capitalize',
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

    certificationsLocation: {
        color: '#ADADAD',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        textTransform: 'capitalize',
    },

    boldText: {
        fontWeight: '600',
    },

    seeMoreText: {
        fontSize: '12px',
        lineHeight: '16.8px',
        fontWeight: '500',
        letterSpacing: '2%',
        color: '#4fcff5',
        textAlign: 'end',
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

export default ProfileCertifications;