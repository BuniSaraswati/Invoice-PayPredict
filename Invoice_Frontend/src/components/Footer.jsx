import React from 'react'

const Footer = () => {
  return (
    <div style={{backgroundColor:'#2d4250', padding:'12px', borderTop :'1px solid black',height:'25px'}}>
        <p style={{textAlign:'center', fontSize:'13px', margin:'auto 0', }}>
            <a href="https://www.highradius.com/privacy-policy/" target="__blank" style={{color:'blue'}}>Privacy Policy</a> | <span 
            style={{color:'white'}}>© 2022 HighRadius Corporation. All rights reserved.</span>
        </p>
    </div>
  )
}

export default Footer