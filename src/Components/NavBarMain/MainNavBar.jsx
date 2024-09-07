import React, { useEffect } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoMenu } from "react-icons/io5";





const MainNavBar = () => {
  const [refresh, setrefresh] = useState("");

    const navi = useNavigate()

    function navagatetor(params) {
        navi("/login")
    }

    let user
    const [userdata, setuserdata] = useState({})

    useEffect(() => {
      let  value= sessionStorage.getItem('user');
      user = JSON.parse(value);
      setuserdata(JSON.parse(value))
        if (user) {
          setloginsts(true)
        }else{
          setloginsts(false)
        }
      
    }, [refresh] )
    
   function logout(params) {
    sessionStorage.removeItem('user');
    setrefresh(Math.random())


   }



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showuser, setshowuser] = useState(true)
  const [loginsts, setloginsts] = useState(false)

  return (
    <div>
      <nav className="nav-bar-main">
        <div className="nav-bar-main-child ">
          <div className="password-logo">
      
              <h2 onClick={handleShow}>PasswordManager</h2> 
          
          </div>

          <div className="pe-5">
            {loginsts ?  <h4> Welcome {userdata?.name} ! </h4>  : <h4 onClick={navagatetor} > Log in </h4> }
          </div>

          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
              {loginsts ?  <h4> Welcome {userdata?.name} ! </h4>  : <h4 onClick={navagatetor} > Log in </h4> }



              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <div className="d-flex flex-column gap-3 align-items-center">
                    <Link className="Link-tag-nav-bar" to="/"> HOME </Link>
                    <Link className="Link-tag-nav-bar" to="/aboutus"> ABOUT US</Link>
                    <button className="btn bg-danger" onClick={logout} > log out</button>


                </div>
             
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>
    </div>
  );
};

export default MainNavBar;
