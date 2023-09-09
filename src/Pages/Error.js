import React from 'react'
import CustomNavbar from '../components/CustomNavbar';

function Error() {
    return (
        <div >
          <CustomNavbar/>
          <div className="d-flex align-items-center justify-content-center mt-5">
            <h3>Oops, we couldn't find that page.</h3>
          </div>
        </div>
      )
}

export default Error




