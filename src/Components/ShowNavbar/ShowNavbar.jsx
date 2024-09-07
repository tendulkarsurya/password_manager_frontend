import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ShowNavbar = ({children}) => {

    const currentlocarion = useLocation().pathname
    const [locshow, setlocshow] = useState(false)
useEffect(() => {

    console.log(currentlocarion);
    
 if (currentlocarion === "/login") {
    setlocshow(false)
 }else{
    setlocshow(true)

 }
  
}, [currentlocarion])

  return (
    <div>
          {locshow && children}
    </div>
  )
}

export default ShowNavbar