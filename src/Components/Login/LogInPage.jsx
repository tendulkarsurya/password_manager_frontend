import React, { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../loading/LoadingPage";
import { Bounce, Flip, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogInPage = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  function changeflip() {
    let card = document.getElementsByClassName("card");
    card[0].classList.toggle("is-flipped");
  }
  function changeflip1() {
    let card = document.getElementsByClassName("card1");
    card[0].classList.toggle("is-flipped1");
  }

  const [eyeshow, seteyeshow] = useState(true);
  const [eyeshow1, seteyeshow1] = useState(true);

  // Intergration ++++++

  function eyechangersoso() {
    let pass = document.getElementById("passsd");

    if (eyeshow) {
      seteyeshow(false);
      pass.type = "text";
    } else {
      seteyeshow(true);
      pass.type = "password";
    }
  }
  function eyechangersoso1() {
    let pass = document.getElementById("password1");

    if (eyeshow1) {
      seteyeshow1(false);
      pass.type = "text";
    } else {
      seteyeshow1(true);
      pass.type = "password";
    }
  }

  // ++++++ Refresh ++++
  const [refresh, setrefresh] = useState("");
  // ++++++ create ac ++++

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState();

  function resetfunctiom(params) {
    setusername("");
    setemail("");
    setpassword("");
    setphone("");
  }

  async function regusernew(params) {
    try {
      const config = {
        method: "post",
        url: "usercreate/",
        baseURL: "http://localhost:8000/api/",
        headers: {
          "content-type": "application/json",
        },
        data: {
          email: email.toLowerCase(),
          displayname: username,
          password: password,
          phone: Number(phone),
        },
      };
      if (email.length > 5 && username && password.length >= 8 && phone) {
        let success = await axios(config);

        if (success) {
          alert("Account has beed create");
          window.location.reload();
          resetfunctiom();
        }

        if (!success) {
          alert("Error in create ac");
        }
      } else {
        if (email.length <= 5) {
          alert("Enter Valid mail");
        }
        if (!username) {
          alert("Enter Valid username");
        }
        if (password.length <= 8) {
          alert("password must : 8 Char");
        }
        if (!phone) {
          alert("Enter Valid phone");
        }
      }
    } catch (error) {
      alert(error.response.data.data + " " + error.response.data.message);
    }
  }
  // ++++++ login ac ++++
  const [logemail, setlogemail] = useState("");
  const [logpass, setlogpass] = useState("");
  const [storage, setstorage] = useState({});
  async function loginfunction(params) {
    setloading(true);
    let config = {
      method: "post",
      url: "userlogin",
      baseURL: "http://localhost:8000/api/",
      headers: {
        "content-type": "application/json",
      },
      data: {
        email: logemail.toLowerCase(),
        password: logpass,
      },
    };
    // console.log(config);

    try {
      let post = await axios(config);
      if (post) {
        // alert("Welcome " + post.data.data.name + " !");
        // alert(post?.data.message)
        // console.log(post);
        setloading(false);
        toast("Welcome " + post?.data.data.name + " !")
        sessionStorage.setItem("user", JSON.stringify(post.data.data));
        setrefresh(Math.random());
        settimerlogout();
        navigate("/");
      } else {
        // alert()
        // console.log(post);
        setloading(false);
        toast("Wow so easy !")

      }
    } catch (error) {
      setloading(false);
      toast(error.response?.data.message)

      // alert(error.response?.data.message);

      // alert(error.message)
    }
  }

  useEffect(() => {
    setstorage(JSON.parse(sessionStorage.getItem("user")));
  }, [refresh]);

  console.log("storage", storage);

  function settimerlogout(params) {
    // console.log("sakjdhakdjashkdjahskjdh");
  }

  // +++++++ reset pass

  const [changepassmail, setchangepassmail] = useState("");

  async function sendmail() {
    setloading(true);

    try {
      let config = {
        method: "post",
        url: "userrequsetotp",
        baseURL: "http://localhost:8000/api/",
        headers: {
          "content-type": "application/json",
        },
        data: {
          email: changepassmail.toLowerCase(),
        },
      };
      // console.log("config - respass",config);

      let res = await axios(config);

      if (res) {
        // alert(res.data.message)
        setloading(false);
        // console.log(res);

        // setchangepassmail("")
      } else {
        alert(res.data.data.message);
        setloading(false);
      }
    } catch (error) {
      // console.log(error.response?.data.message);

      alert(error.response?.data.message);
      setloading(false);
    }
  }

  // ++++++ changepass

  const [verifyotp, setverifyotp] = useState(0);
  const [newpass, setnewpass] = useState("");

  async function changepasswordotp() {
    let config = {
      url: "/userresetpassword",
      baseURL: "http://localhost:8000/api",
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      data: {
        email: changepassmail.toLowerCase(),
        otp: Number(verifyotp),
        newpassword: newpass,
      },
    };
    // console.log("config respass",config);

    try {
      let changed = await axios(config);

      if (changed) {
        alert(changed.data.message);
        // console.log(changed.data);
        window.location.reload();
      } else {
        alert("rrror");
      }
    } catch (error) {
      alert(error.response.data.message);

      // alert(error)
    }
  }

  return (
    <div className="login-page-main-div">
      {loading && <LoadingPage />}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Slide}
      />

{/* <ToastContainer /> */}

      <div class="flip-box">
        <div class="card">
          <div class="flip-box-front ">
            <div>
              <h2>Change Password</h2>
            </div>

            <div className="d-flex flex-column ">
              <div className="m-2">
                <div className="col d-flex flex-row gap-2">
                  <label htmlFor="" for="emails ">
                    <h5> Email : </h5>
                  </label>
                  <input
                    className="input-user-all"
                    id="emails"
                    type="email"
                    onChange={(e) => setchangepassmail(e.target.value)}
                  />
                  <button className="all-common-btn-login" onClick={sendmail}>
                    {" "}
                    Send Mail{" "}
                  </button>
                </div>
              </div>
              <div className="m-2">
                <div className="col d-flex flex-row gap-2">
                  <label htmlFor="" for="OTP">
                    <h5> OTP : </h5>
                  </label>
                  <input
                    className="input-user-all"
                    id="OTP"
                    placeholder="OTP "
                    type="Number"
                    onChange={(e) => {
                      setverifyotp(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="m-2">
                <div className="col d-flex flex-row gap-2">
                  <label htmlFor="" for="newpass">
                    <h5> New password : </h5>
                  </label>
                  <input
                    className="input-user-all"
                    id="newpass"
                    placeholder="Enter Password "
                    type="text"
                    onChange={(e) => {
                      setnewpass(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                className="all-common-btn-login"
                onClick={changepasswordotp}
              >
                {" "}
                Submit{" "}
              </button>
              <button className="all-common-btn-login" onClick={changeflip}>
                {" "}
                Back
              </button>
            </div>
          </div>

          <div class="flip-box-back">
            <div class="flip-box1">
              <div class="card1">
                <div class="flip-box-front1">
                  <div>
                    <h2>Log in</h2>
                  </div>

                  <div className="d-flex flex-column ">
                    <div className="m-2">
                      <div className="col d-flex flex-row gap-2">
                        <label htmlFor="" for="usernamel ">
                          <h5> E-mail id &nbsp; : </h5>
                        </label>
                        <input
                          className="input-user-all"
                          id="usernamel"
                          type="email"
                          placeholder="Enter Email"
                          onChange={(e) => setlogemail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="m-2">
                      <div className="col d-flex flex-row gap-2 position-relative">
                        <label htmlFor="" for="password1">
                          <h5> Password &nbsp;: </h5>
                        </label>
                        <input
                          className="input-user-all"
                          id="password1"
                          type="password"
                          onChange={(e) => setlogpass(e.target.value)}
                        />
                        <span
                          className="eyeshow-pass"
                          onClick={eyechangersoso1}
                        >
                          {eyeshow1 ? (
                            <FaRegEyeSlash className="eyeshowicon" />
                          ) : (
                            <FaRegEye className="eyeshowicon" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="all-common-btn-login"
                      onClick={loginfunction}
                    >
                      {" "}
                      Log Me In{" "}
                    </button>
                    <button
                      className="all-common-btn-login"
                      onClick={changeflip}
                    >
                      {" "}
                      Forget password
                    </button>
                    <button
                      className="all-common-btn-login"
                      onClick={changeflip1}
                    >
                      {" "}
                      Register{" "}
                    </button>
                  </div>
                </div>

                <div class="flip-box-back1">
                  <div>
                    <h2>Register As New User</h2>
                  </div>

                  <div className="d-flex flex-column ">
                    <div className="m-1">
                      <div className="col d-flex flex-row gap-2">
                        <label htmlFor="" for="username ">
                          <h5> Username : </h5>
                        </label>
                        <input
                          className="input-user-all"
                          onChange={(e) => setusername(e.target.value)}
                          id="username"
                          required
                          value={username}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="m-1">
                      <div className="col d-flex flex-row gap-2">
                        <label htmlFor="" for="email ">
                          <h5> E-mail id &nbsp; : </h5>
                        </label>
                        <input
                          className="input-user-all"
                          required
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          id="email"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="m-1">
                      <div className="col d-flex flex-row gap-2">
                        <label htmlFor="" for="phone ">
                          <h5> Phone No : </h5>
                        </label>
                        <input
                          className="input-user-all"
                          onChange={(e) => setphone(e.target.value)}
                          required
                          id="phone"
                          value={phone}
                          type="number"
                        />
                      </div>
                    </div>

                    <div className="m-1">
                      <div className="col d-flex flex-row gap-2 position-relative">
                        <label htmlFor="" for="passsd">
                          <h5> Password &nbsp;: </h5>
                        </label>
                        <input
                          className="input-user-all"
                          onChange={(e) => setpassword(e.target.value)}
                          value={password}
                          required
                          id="passsd"
                          type="password"
                        />
                        <span className="eyeshow-pass" onClick={eyechangersoso}>
                          {eyeshow ? (
                            <FaRegEyeSlash className="eyeshowicon" />
                          ) : (
                            <FaRegEye className="eyeshowicon" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="all-common-btn-login"
                      onClick={regusernew}
                    >
                      {" "}
                      Sign up
                    </button>

                    <button
                      className="all-common-btn-login"
                      onClick={changeflip1}
                    >
                      {" "}
                      Already a user !{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="flip-box">
        <div class="card">
          <div class="flip-box-front">
            <div>
              <h2>Log in</h2>
            </div>

            <div className="d-flex flex-column ">
              <div className="m-2">
                <div className="col d-flex flex-row gap-2">
                  <label htmlFor="" for="username ">
                    <h5> Username : </h5>
                  </label>
                  <input className="input-user-all" id="username" type="text" />
                </div>
               
              </div>
              <div className="m-2">
                <div className="col d-flex flex-row gap-2">
                  <label htmlFor="" for="username">
                    <h5> Password &nbsp;: </h5>
                  </label>
                  <input className="input-user-all" id="username" type="text" />
                </div>
             
              </div>
            </div>

            <div className="d-flex gap-2">
              <button className="all-common-btn-login"> Log Me In </button>
              <button className="all-common-btn-login" > Forget password</button>
              <button className="all-common-btn-login" onClick={changeflip}> Register </button>
            </div>
          </div>

          <div class="flip-box-back">
              
              <div>
              <h2>Register As New User</h2>
            </div>
            
            <div className="d-flex flex-column ">
              <div className="m-1">
                <div className="col d-flex flex-row gap-2">
                  <label htmlFor="" for="username ">
                    <h5> Username : </h5>
                  </label>
                  <input className="input-user-all" id="username" type="text" />
                </div>
                
              </div>
              <div className="m-1">
                <div className="col d-flex flex-row gap-2">
                  <label htmlFor="" for="username ">
                    <h5> E-mail id &nbsp; : </h5>
                  </label>
                  <input className="input-user-all" id="username" type="text" />
                </div>
             
              </div>
              <div className="m-1">
                <div className="col d-flex flex-row gap-2">
                  <label htmlFor="" for="username ">
                    <h5> Phone No : </h5>
                  </label>
                  <input className="input-user-all" id="username"  type="number" />
                </div>
            
              </div>

              <div className="m-1">
                <div className="col d-flex flex-row gap-2">
                  <label htmlFor="" for="username">
                    <h5> Password &nbsp;: </h5>
                  </label>
                  <input className="input-user-all" id="username" type="text" />
                </div>
             
              </div>
            </div>

            <div className="d-flex gap-2">
              <button className="all-common-btn-login" > Sign up</button>
              
              <button className="all-common-btn-login" onClick={changeflip}> Already a user ! </button>
            </div>
         
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LogInPage;
