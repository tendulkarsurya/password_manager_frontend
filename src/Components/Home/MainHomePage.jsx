import React from 'react'
import LoadingPage from '../loading/LoadingPage'
import { ToastContainer } from 'react-toastify'
import "./MainHome.css"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const MainHomePage = () => {
  return (
    <div>
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
     
      />
      <div className='col-md-12 home-main-div ' >

        {/* <div className="col-md-3 homeleft  home-both"  >
          <div>
              <ul>
                <li> Save Password</li>
                <li> password Strength Checker</li>
                <li> Password Encrypt & Decrypt</li>
             
              </ul>
          </div>
        </div>
        <div className="col-md-9 homeright home-both" >


            
        </div> */}


      </div>
        <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
      <Tab>Title 2</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>

    </div>
  )
}

export default MainHomePage