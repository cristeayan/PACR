import React, { useState } from 'react';

const ProfileAbout = () => {
    return (
        <div style={styles.postStyle}>
            <h2 style={styles.aboutHeading}>About</h2>
            <p style={styles.aboutText}>Passionate about transcending boundaries and igniting imaginations, I've embraced the digital canvas for my artistic journey. Specializing in graphic design, UX design, digital art, and architecture, my work aims to create meaningful experiences and evoke emotions, blending beauty with functionality.</p>
            <p style={styles.seeMoreText}>...See More</p>
            <div style={styles.horizontalDivider}></div>
            <div style={styles.aboutDetailStyle}>
                <div style={styles.aboutInnerWrap}>
                    <span style={styles.aboutWorkplaceLabel}>Department</span>
                    <span style={styles.aboutDetailText}>:</span>
                    <span style={styles.aboutDetailText}>Gastroenterology</span>
                </div>
                <div style={styles.aboutInnerWrap}>
                    <span style={styles.aboutWorkplaceLabel}>Industry</span>
                    <span style={styles.aboutDetailText}>:</span>
                    <span style={styles.aboutDetailText}>Medical</span>
                </div>
                <div style={styles.aboutInnerWrap}>
                    <span style={styles.aboutWorkplaceLabel}>Workplace</span>
                    <span style={styles.aboutDetailText}>:</span>
                    <span style={styles.aboutDetailText}>Beth Israel</span>
                </div>
            </div>
            <div style={styles.horizontalDivider}></div>
            <div style={styles.aboutDetailStyle}>
                <div style={styles.aboutDetailwrap}>
                    <img src='Profile Work Icon.svg'></img>
                    <p style={styles.aboutDetailText}>Works at Beth Israel Deaconess Medical Center</p>
                </div>
                <div style={styles.aboutDetailwrap}>
                    <img src='Profile Postdoc Icon.svg'></img>
                    <p style={styles.aboutDetailText}>Postdoc Research Fellow</p>
                </div>
                <div style={styles.aboutDetailwrap}>
                    <img src='Profile Studied Icon.svg'></img>
                    <p style={styles.aboutDetailText}>Studied at Kasturba Medical College, Mangalore</p>
                </div>
                <div style={styles.aboutDetailwrap}>
                    <img src='Profile Lives Icon.svg'></img>
                    <p style={styles.aboutDetailText}>Lives in Boston, MA</p>
                </div>
                <div style={styles.aboutDetailwrap}>
                    <img src='Profile Joined Icon.svg'></img>
                    <p style={styles.aboutDetailText}>Joined on August 1st, 2022</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    postStyle: {
        padding: '24px 18px 30px 28px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '5px 4px 16px 0px #0000001C',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },

    aboutHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '600',
        lineHeight: '28px',
        letterSpacing: '-2%',
    },

    aboutText: {
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
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

    horizontalDivider: {
        backgroundColor: '#ADADAD',
        width: '100%',
        height: '1px',
    },

    aboutDetailStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },

    aboutDetailwrap: {
        display: 'flex',
        flexDirection: 'row',
        gap: '14px',
        alignItems: 'center',
    },

    aboutDetailText: {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '26px',
        letterSpacing: '2%',
    },

    aboutInnerWrap: {
        display: 'grid',
        gridTemplateColumns: '90px 10px auto',
        alignItems: 'center',
        gap: '24px',
    },

    aboutWorkplaceLabel: {
        fontSize: '14px',
        lineHeight: '26px',
        fontWeight: '600',
        color: '#4FCFF5',
    },
};

export default ProfileAbout;