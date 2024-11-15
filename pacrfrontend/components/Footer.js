import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.footerUpperWrapper}>
                    <div style={styles.footerLogoWrap}>
                        <img src='/PACR_Footer_Logo.svg' alt='Footer Logo' />
                    </div>
                    <div style={styles.linksWrap}>
                        <div style={styles.quickLinksWrap}>
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
                        </div>
                        <div style={styles.otherLinksColumn}>
                            <div style={styles.otheLinkMainWrap}>
                                <img src='/Circle_Help.svg' alt='Question Icon' />
                                <div style={styles.otherLinkTextWrap}>
                                    <p style={styles.otherLinkHeading}>Questions?</p>
                                    <a href="#" style={styles.otherLink}>Visit our Help Center.</a>
                                </div>
                            </div>
                            <div style={styles.otheLinkMainWrap}>
                                <img src='/Settings_Future.svg' alt='Privacy Icon' />
                                <div style={styles.otherLinkTextWrap}>
                                    <p style={styles.otherLinkHeading}>Manage your<br /> account and privacy</p>
                                    <a href="#" style={styles.otherLink}>Go to your Settings.</a>
                                </div>
                            </div>
                            <div style={styles.otheLinkMainWrap}>
                                <img src='/Swicht_Left.svg' alt='Recommendation Icon' />
                                <div style={styles.otherLinkTextWrap}>
                                    <p style={styles.otherLinkHeading}>Recommendation transparency</p>
                                    <a href="#" style={styles.otherLink}>Learn more about Recommended Content.</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.languageSelector}>
                    <label htmlFor="language" style={styles.label}>Select Your Language</label>
                    <img src='/Language_Dropdown_Icon.png' alt='Dropdown Icon' style={styles.dropdownIcon} />
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

                <div style={styles.bottomTextWrapper}>
                    <p style={styles.copyrightText}>Pacr Corporation © 2024</p>
                    <div style={styles.termsLinkWrapper}>
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
        backgroundColor: '#A2E1FA',
        padding: '54px 20px 48px',
    },
    container: {
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
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
    quickLinksWrap: {
        width: '100%',
        maxWidth: '17.875rem',
        display: 'flex',
        columnGap: '80px',
    },
    languageSelector: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
        position: 'relative',
    },
    label: {
        fontSize: '16px',
        lineHeight: '18px',
        fontWeight: '400',
        color: '#313131',
    },
    languageDropdown: {
        padding: '18px 28px',
        borderRadius: '48px',
        border: '1px solid #ADADAD',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: '400',
        color: '#CACACA',
        width: '20rem',
        appearance: 'none',
    },
    dropdownIcon: {
        position: 'absolute',
        bottom: '24px',
        right: '28px',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
    },
    otherLinksColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
    },
    otheLinkMainWrap: {
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
    },
    otherLinkTextWrap: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    otherLinkHeading: {
        color: '#313131',
        textTransform: 'capitalize',
        fontSize: '16px',
        lineHeight: '18px',
        fontWeight: '400',
    },
    otherLink: {
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: '400',
        color: '#ffffff',
        textDecoration: 'none',
    },
    link: {
        color: '#313131',
        textDecoration: 'none',
        fontSize: '16px',
        lineHeight: '18px',
        fontWeight: '400',
    },
    bottomTextWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    copyrightText: {
        fontSize: '16px',
        lineHeight: '18px',
        fontWeight: '400',
        color: '#ffffff',
    },
    termsLinkWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '48px',
    },
    termsLink: {
        fontSize: '16px',
        lineHeight: '18px',
        fontWeight: '600',
        color: '#ffffff',
    },
};

export default Footer;