import React, { useState, useEffect } from 'react';
import EditAboutModal from './EditAboutModal';
import { useUser } from '../../context/UserContext';


const ProfileAbout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAbout, setCurrentAbout] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const { user ,token ,setUserAndToken} = useUser();

    useEffect(() => {
        if (user){
            if (user.summary==null){
                setCurrentAbout("Write a summary to highlight your personality or work experience");
            }else{
                setCurrentAbout(user.summary);
            }
        }
    }, [user]);

    const toggleExpanded = () => setIsExpanded(!isExpanded);

    const renderAboutText = () => {
        if (!currentAbout) {
            return (
                <p style={styles.placeholderText}>
                    {currentAbout}
                </p>
            );
        }

        if (currentAbout.length > 300) {
            if (isExpanded) {
                return (
                    <>
                        <p style={styles.aboutText}>{currentAbout}</p>
                        <p style={styles.seeMoreText} onClick={toggleExpanded}>...See Less</p>
                    </>
                );
            } else {
                return (
                    <>
                        <p style={styles.aboutText}>{currentAbout.slice(0, 280)}...</p>
                        <p style={styles.seeMoreText} onClick={toggleExpanded}>...See More</p>
                    </>
                );
            }
        }

        return <p style={styles.aboutText}>{currentAbout}</p>;
    };

    const handleEdit = () => {
        setIsModalOpen(true);
    };

    const handleSave = (updatedText) => {
        setCurrentAbout(updatedText);
        setIsModalOpen(false); // Close modal after savin


    };


    return (
        <div style={styles.postStyle}>
            <div style={styles.aboutHeadingMainWrap}>
                <h2 style={styles.aboutHeading}>About</h2>
                <div style={styles.aboutEditIconWrap}>
                    <img src='Edit Icon.svg' alt='Edit Icon' style={styles.aboutEditIcon} onClick={handleEdit} />
                </div>
            </div>
            {/* About Text */}
            <div style={styles.aboutTextHolder}>
            {renderAboutText()}
            </div>

            <EditAboutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aboutText={currentAbout}
                onSave={handleSave}
                user={user}
                token={token}
                setUserAndToken={setUserAndToken}
            />

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

    aboutHeadingMainWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    aboutHeading: {
        fontSize: '20px',
        color: '#313131',
        fontWeight: '600',
        lineHeight: '28px',
        letterSpacing: '-2%',
    },

    aboutTextHolder: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },

    aboutText: {
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        color: '#313131',
        whiteSpace: 'pre-wrap',
    },

    seeMoreText: {
        fontSize: '12px',
        lineHeight: '16.8px',
        fontWeight: '500',
        letterSpacing: '2%',
        color: '#4fcff5',
        textAlign: 'end',
        cursor: 'pointer',
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

    aboutEditIconWrap: {
        width: 'auto',
        height: '26px',
        cursor: 'pointer',
    },

    aboutEditIcon: {
        width: '26px',
    },
    
    placeholderText: {
        fontSize: '14px',
        color: '#adadad',
        fontStyle: 'italic',
    },
};

export default ProfileAbout;