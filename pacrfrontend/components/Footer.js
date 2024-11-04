import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.footerUpperWrapper}>
                    <div style={styles.footerLogoWrap}>
                        <img src='/PACR Footer Logo.svg' alt='Footer Logo' />
                    </div>
                    <div style={styles.linksWrap}>
                        <div style={styles.column}>
                            <a href="#" style={styles.link}>Home</a>
                            <a href="#" style={styles.link}>Research</a>
                            <a href="#" style={styles.link}>Communities</a>
                        </div>
                        <div style={styles.column}>
                            <a href="#" style={styles.link}>Statistics</a>
                            <a href="#" style={styles.link}>Notifications</a>
                            <a href="#" style={styles.link}>Messages</a>
                        </div>
                        <div style={styles.column}>
                            <a href="#" style={styles.link}><span style={styles.icon}>❓</span> Questions?</a>
                            <a href="#" style={styles.link}><span style={styles.icon}>🔒</span> Manage Your Account And Privacy</a>
                            <a href="#" style={styles.link}><span style={styles.icon}>👁️</span> Recommendation Transparency</a>
                        </div>
                    </div>
                </div>

                <div style={styles.languageSelector}>
                    <label htmlFor="language" style={styles.label}>Select Your Language</label>
                    <select id="language" style={styles.languageDropdown}>
                        <option value="en-US">English (US)</option>
                        <option value="en-GB">English (UK)</option>
                        <option value="es-ES">Spanish (Spain)</option>
                        <option value="es-MX">Spanish (Mexico)</option>
                        <option value="fr-FR">French (France)</option>
                        <option value="fr-CA">French (Canada)</option>
                        <option value="de-DE">German</option>
                        <option value="it-IT">Italian</option>
                        <option value="pt-BR">Portuguese (Brazil)</option>
                        <option value="pt-PT">Portuguese (Portugal)</option>
                        <option value="zh-CN">Chinese (Simplified)</option>
                        <option value="zh-TW">Chinese (Traditional)</option>
                        <option value="ja-JP">Japanese</option>
                        <option value="ko-KR">Korean</option>
                        <option value="ru-RU">Russian</option>
                        <option value="ar-SA">Arabic (Saudi Arabia)</option>
                        <option value="hi-IN">Hindi</option>
                        <option value="bn-BD">Bengali (Bangladesh)</option>
                        <option value="ms-MY">Malay</option>
                        <option value="vi-VN">Vietnamese</option>
                        <option value="th-TH">Thai</option>
                        <option value="tr-TR">Turkish</option>
                        <option value="nl-NL">Dutch</option>
                        <option value="sv-SE">Swedish</option>
                        <option value="pl-PL">Polish</option>
                        <option value="fi-FI">Finnish</option>
                        <option value="no-NO">Norwegian</option>
                        <option value="da-DK">Danish</option>
                        <option value="cs-CZ">Czech</option>
                        <option value="el-GR">Greek</option>
                        <option value="hu-HU">Hungarian</option>
                        <option value="he-IL">Hebrew</option>
                        <option value="id-ID">Indonesian</option>
                        <option value="ro-RO">Romanian</option>
                        <option value="ur-PK">Urdu (Pakistan)</option>
                    </select>
                </div>

                <div style={styles.bottomText}>
                    <p>Pacr Corporation © 2024</p>
                    <div style={styles.termsLinks}>
                        <a href="#" style={styles.termsLink}>Terms And Conditions</a>
                        <a href="#" style={styles.termsLink}>Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: 'rgb(238 238 238)',
        padding: '54px 20px 48px',
    },
    container: {
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '54px',
    },
    footerUpperWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '40px',
        width: '100%',
    },
    linksWrap: {
        width: '100%',
        maxWidth: '42.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        columnGap: '100px',
    },
    languageSelector: {
        marginBottom: '30px',
    },
    label: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '10px',
    },
    languageDropdown: {
        padding: '10px 15px',
        borderRadius: '25px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    link: {
        color: '#333',
        textDecoration: 'none',
        fontSize: '15px',
    },
    icon: {
        marginRight: '5px',
    },
    bottomText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#666',
        fontSize: '14px',
        marginTop: '20px',
    },
    termsLinks: {
        display: 'flex',
        gap: '20px',
        marginTop: '10px',
    },
    termsLink: {
        color: '#666',
        textDecoration: 'none',
    },
};

export default Footer;