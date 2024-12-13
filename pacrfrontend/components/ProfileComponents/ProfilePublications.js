import React, { useState } from 'react';

const ProfilePublications = () => {
    return (
        <div style={styles.publicationsContainer}>
            <h2 style={styles.publicationseHeading}>Publications</h2>

            <div style={styles.publicationsInnerWrap}>
                {/* Publication Item 1 */}
                <div style={styles.publicationsItem}>
                    <div style={styles.publicationsDetailWrap}>
                        <div style={styles.publicationsTitleWrap}>
                            <p style={styles.publicationsTitle}>Whole blood viscosity in type 2 diabetes mellitus and its association with the presence and severity of diabetic cochleopathy and other microangiopathie</p>
                            <p style={styles.publicationsLocation}>Porto Biomedical Journal · <span>8 Months</span></p>
                        </div>
                        <a href='#' style={styles.publicationButton}>Show Publication<img src='Publication Arrow.svg' alt='Publication Arrow' /></a>
                        <div style={styles.backgroundAimsWrap}>
                            <span style={styles.aimsText}>Background/Aims:</span>
                            <span style={styles.aimsText}>Although studies correlating idiopathic sensorineural hearing loss (SNHL) to whole blood viscosity (WBV) have been</span>
                            <span style={styles.boldSeeMore}>...See More</span>
                        </div>
                        <div style={styles.otherAuthorWrap}>
                            <span style={styles.otherAuthor}>Other Authors</span>
                            <a href='#'><img src='Other_Authors.png' alt='Other Authors Image' /></a>
                        </div>
                    </div>
                </div>
                {/* Publication Item 2 */}
                <div style={styles.horizontalDivider}></div>
                <div style={styles.publicationsItem}>
                    <div style={styles.publicationsDetailWrap}>
                        <div style={styles.publicationsTitleWrap}>
                            <p style={styles.publicationsTitle}>Comparative Analysis of Supraglottic Airway vs. Infraglottic Airway in Endoscopic Retrograde Cholangiopancreatography: A Systematic Review and Meta-Analysis</p>
                            <p style={styles.publicationsLocation}>Gastroenterology and Hepatology From Bed to Bench Journal · <span>Oct 5, 2024</span></p>
                        </div>
                        <a href='#' style={styles.publicationButton}>Show Publication<img src='Publication Arrow.svg' alt='Publication Arrow' /></a>
                        <div style={styles.backgroundAimsWrap}>
                            <span style={styles.aimsText}>Background/Aims:</span>
                            <span style={styles.aimsText}>Although studies correlating idiopathic sensorineural hearing loss (SNHL) to whole blood viscosity (WBV) have been</span>
                            <span style={styles.boldSeeMore}>...See More</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const styles = {
    publicationsContainer: {
        padding: '24px 28px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '5px 4px 16px 0px #0000001C',
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
    },

    publicationsHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '600',
        lineHeight: '28px',
    },

    publicationsInnerWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },

    publicationsItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
    },

    publicationsDetailWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
    },

    publicationsTitleWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },

    publicationsTitle: {
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '18px',
        color: '#313131',
        textTransform: 'capitalize',
    },

    publicationsLocation: {
        color: '#ADADAD',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        textTransform: 'capitalize',
    },

    publicationButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 28px',
        border: '1px solid #313131',
        borderRadius: '200px',
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '400',
        color: '#313131',
        textDecoration: 'none',
    },

    backgroundAimsWrap: {
        display: 'flex',
        flexDirection: 'column',
    },

    aimsText: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '300',
        color: '#313131',
    },

    otherAuthorWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
    },

    otherAuthor: {
        fontSize: '12px',
        lineHeight: '14px',
        fontWeight: '500',
        color: '#313131',
    },

    horizontalDivider: {
        backgroundColor: '#ADADAD',
        width: '100%',
        height: '1px',
    },

    boldSeeMore: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '500',
        color: '#313131',
        textAlign: 'end',
    },
};

export default ProfilePublications;