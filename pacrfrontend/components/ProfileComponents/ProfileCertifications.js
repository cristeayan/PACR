import React, { useState } from 'react';

const ProfileCertifications = () => {
    return (
        <div style={styles.certificationsContainer}>
            <h2 style={styles.certificationsHeading}>Licenses / Certifications</h2>

            <div style={styles.certificationsInnerWrap}>
                {/* Certification Item 1 */}
                <div style={styles.certificationsItem}>
                    <img src="CITI.png" alt="CITI Logo" style={styles.certificationsIcon} />
                    <div style={styles.certificationsDetailWrap}>
                        <div style={styles.certificationsTitleWrap}>
                            <p style={styles.certificationsTitle}>CITI Certification</p>
                            <p style={styles.certificationsTitle}>CITI Program</p>
                            <p style={styles.certificationsLocation}>Issued Apr 2024</p>
                        </div>
                        <div>
                            <p style={styles.certificationsTitle}><span style={styles.boldText}>Skills:</span> Human Subjects Research</p>
                        </div>
                    </div>
                </div>

                {/* Certification Item 2 */}
                <div style={styles.certificationsItem}>
                    <img src="Avade.png" alt="Avade Logo" style={styles.certificationsIcon} />
                    <div style={styles.certificationsDetailWrap}>
                        <div style={styles.certificationsTitleWrap}>
                            <p style={styles.certificationsTitle}>AVADE Certificate</p>
                            <p style={styles.certificationsTitle}>AVADE® Training</p>
                            <p style={styles.certificationsLocation}>Issued Mar 2024</p>
                        </div>
                        <div>
                            <p style={styles.certificationsTitle}><span style={styles.boldText}>Skills:</span> Human Subjects Research</p>
                        </div>
                    </div>
                </div>

                {/* Certification Item 3 */}
                <div style={styles.certificationsItem}>
                    <img src="Asthma.png" alt="Asthma Logo" style={styles.certificationsIcon} />
                    <div style={styles.certificationsDetailWrap}>
                        <div style={styles.certificationsTitleWrap}>
                            <p style={styles.certificationsTitle}>Asthma, Allergy and COPD Forum</p>
                            <p style={styles.certificationsTitle}>Dubai Health Authority</p>
                            <p style={styles.certificationsLocation}>Issued Feb 2024</p>
                        </div>
                        <div>
                            <p style={styles.certificationsTitle}><span style={styles.boldText}>Skills:</span> Human Subjects Research</p>
                        </div>
                    </div>
                </div>
            </div>
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

    certificationsHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '600',
        lineHeight: '28px',
    },

    certificationsInnerWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
    },

    certificationsItem: {
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
};

export default ProfileCertifications;