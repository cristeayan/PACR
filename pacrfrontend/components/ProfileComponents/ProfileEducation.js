import React, { useState } from 'react';

const ProfileEducation = () => {
    return (
        <div style={styles.educationContainer}>
            <h2 style={styles.educationHeading}>Education</h2>

            <div style={styles.educationInnerWrap}>
                {/* Education Item 1 */}
                <div style={styles.educationItem}>
                    <img src="Kasturba.png" alt="Kasturba Logo" style={styles.educationIcon} />
                    <div style={styles.educationDetailWrap}>
                        <div style={styles.educationTitleWrap}>
                            <p style={styles.educationTitle}>Kasturba Medical College, Mangalore</p>
                            <p style={styles.roleTitle}>Bachelor of Medicine, Bachelor of Surgery - MBBS, Medicine</p>
                        </div>
                        <div>
                            <p style={styles.educationLocation}>2017 - 2022</p>
                        </div>
                    </div>
                </div>

                {/* Education Item 2 */}
                <div style={styles.educationItem}>
                    <img src="postdoctoral_icon.png" alt="International Research Logo" style={styles.educationIcon} />
                    <div style={styles.educationDetailWrap}>
                        <div style={styles.educationTitleWrap}>
                            <p style={styles.educationTitle}>KE English School</p>
                            <p style={styles.roleTitle}>Higher Secondary Education</p>
                        </div>
                        <div>
                            <p style={styles.educationLocation}>2017 - 2022</p>
                        </div>
                    </div>
                </div>

                {/* Education Item 3 */}
                <div style={styles.educationItem}>
                    <img src="postdoctoral_icon.png" alt="International Research Logo" style={styles.educationIcon} />
                    <div style={styles.educationDetailWrap}>
                        <div style={styles.educationTitleWrap}>
                            <p style={styles.educationTitle}>Gems Education</p>
                            <p style={styles.roleTitle}>Middle School</p>
                        </div>
                        <div>
                            <p style={styles.educationLocation}>2010 - 2015</p>
                        </div>
                    </div>
                </div>
            </div>
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

    educationHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '600',
        lineHeight: '28px',
    },

    educationInnerWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
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

    seeMoreText: {
        fontSize: '12px',
        lineHeight: '16.8px',
        fontWeight: '500',
        letterSpacing: '2%',
        color: '#4fcff5',
        textAlign: 'end',
    },
};

export default ProfileEducation;