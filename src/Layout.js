import React from 'react'
import { Oval } from 'react-loader-spinner'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Footer from './components/Footer/Footer'

function Layout() {
  const open = useSelector((state) => state.notifAndLoadingReducer.appLoading)

  return (
    <>
      <Outlet />
      <Footer />
      {open && (
        <div
          style={{
            color: '#fff',
            zIndex: '99999999999999',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            flexDirection: 'column',
            position: 'absolute',
            top: '0px',
            width: '100%',
            height: '100%',
            background: '#00000041',
          }}
        >
          <Oval
            height={80}
            width={80}
            color="#000000"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#FFFFFF"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </>
  )
}

export default Layout
