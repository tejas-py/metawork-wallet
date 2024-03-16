import React from 'react'
import logo from '../../assets/logo-nobg.png'
import '../../app.css'

export default function Footer() {
  return (
    <footer class="footer fixed place-content-evenly bottom-0 bg-primary text-neutral h-12">
      <div class="items-center grid-flow-col self-center">
        <img
          src={logo}
          alt="Company Logo"
          className="footer-logo"
          onClick={() => {
            window.open('https://metawork.securetool.company', '_blank')
          }}
          style={{ width: '100px', height: '25px' }}
        />
        <p>Copyright © 2024 - All right reserved</p>
      </div>
    </footer>
  )
}
