import React from 'react'
import './Footer.css'
import logo from '../../assets/logo-nobg.png'

export default function Footer() {
  return (
    <footer className="footer">
      <img
        src={logo}
        alt="Company Logo"
        className="footer-logo"
        onClick={() => {
          window.open('https://metawork.securetool.company', '_blank')
        }}
      />
    </footer>
  )
}