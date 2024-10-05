import "../../app/globals.css";
import { useState } from 'react';

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.centeredContent}>
      <h2 style={styles.welcomeHeading}>WELCOME TO</h2>
        <img src="/Welcome PACR Logo.svg" alt="PACR logo" style={styles.logo} />
        <p style={styles.tagline}>GO MAKE YOUR MARK ON THIS WORLD</p>
      </div>
    </div>
  );
}

const styles = {
container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(114.24deg, rgba(255, 255, 255, 0.13) 1.23%, rgba(98, 205, 247, 0.13) 60.62%, rgba(5, 193, 240, 0.13) 100%)',
    textAlign: 'center',
  },
  centeredContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  },
  welcomeHeading: {
    fontSize: '16px',
    lineHeight: '17.6px',
    letterSpacing: '2%',
    fontWeight: '600',
    color: '#70d4fc',
    textTransform: 'uppercase'
  },
  companyName: {
    fontSize: '64px',
    color: '#4baeff',
    margin: '0',
  },
  tagline: {
    fontSize: '16px',
    lineHeight: '17.6px',
    letterSpacing: '2%',
    fontWeight: '600',
    color: '#70d4fc',
    textTransform: 'uppercase',
    width: '50%'
  },
}
  