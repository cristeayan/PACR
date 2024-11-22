import React from 'react';

const Congrats = () => {
    return (
        <div style={styles.congratsMainWrap}>
            <img src='/PACR_Light_Logo.svg' alt='PACR Light Logo' style={styles.congratsBannerLogo}/>
            <p style={styles.congratsText}>Congratulations on reaching <span style={styles.boldText}>1000 views</span> on your research article titled “UGI Bleeding and its updated guidelines: 2024”</p>
            <a href='#' style={styles.shareButton}><img src='/Share_Icon.svg' alt='Share Icon'/>Share</a>
        </div>
    );
};

const styles = { 
    congratsMainWrap: {
        backgroundColor: '#98E6FF',
        padding: '26px 20px',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },

    congratsBannerLogo: {
        position: 'absolute',
        left: '-20px',
        top: '5px',
    },

    congratsText: {
        fontSize: '24px',
        lineHeight: '30px',
        fontWeight: '400',
        textAlign: 'center',
        color: '#fff',
    },

    boldText: {
        fontWeight: '700',
    },

    shareButton: {
        padding: '16px 40px',
        borderRadius: '200px',
        border: '1px solid #fff',
        fontSize: '16px',
        lineHeight: '22px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        textDecoration: 'none',  
    },
};

export default Congrats;