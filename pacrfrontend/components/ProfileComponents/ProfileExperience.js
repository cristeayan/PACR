import React, { useState } from 'react';

const ProfileExperience = () => {
    return (
        <div style={styles.experienceContainer}>
            <h2 style={styles.experienceHeading}>Experience</h2>

            <div style={styles.experienceInnerWrap}>
                {/* Experience Item 1 */}
                <div style={styles.experienceItem}>
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
                </div>

                {/* Experience Item 2 */}
                <div style={styles.experienceItem}>
                    <img src="/postdoctoral_icon.png" alt="International Research Logo" style={styles.experienceIcon} />
                    <div style={styles.experienceDetailWrap}>
                        <div style={styles.experienceTitleWrap}>
                            <p style={styles.experienceTitle}>Postdoctoral Research Fellow</p>
                            <p>International Research Initiative · <span style={styles.experienceDetails}>Full Time</span></p>
                            <p style={styles.experienceDetails}>March 2024 - Present · 8 Months</p>
                        </div>
                        <p style={styles.experienceLocation}>Boston, Massachusetts, United States Of America · On-Site</p>
                        <p style={styles.roleDescription}>PostDoctoral Research Fellow - Class Of 2025</p>
                    </div>
                </div>

                {/* Experience Item 3 */}
                <div style={styles.experienceItem}>
                    <img src="/hms_icon.png" alt="Harvard Logo" style={styles.experienceIcon} />
                    <div style={styles.experienceDetailWrap}>
                        <div style={styles.experienceTitleWrap}>
                            <p style={styles.experienceTitle}>Postdoctoral Research Fellow</p>
                            <p>Harvard Medical School · <span style={styles.experienceDetails}>Full Time</span></p>
                            <p style={styles.experienceDetails}>March 2024 - Present · 8 Months</p>
                        </div>
                        <p style={styles.experienceLocation}>Boston, Massachusetts, United States Of America · On-Site</p>
                        <p style={styles.roleDescription}>Postdoctoral Research Fellow at Beth Israel Deaconess Medical Center, Harvard Medical School</p>
                    </div>
                </div>
            </div>

            <p style={styles.seeMoreText}>...See More</p>
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

    experienceHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '600',
        lineHeight: '28px',
    },

    experienceInnerWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
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
};

export default ProfileExperience;