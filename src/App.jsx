import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainNavBar from "./Components/NavBarMain/MainNavBar";
import MainHomePage from "./Components/Home/MainHomePage";
import MainAboutusPage from "./Components/Aboutus/MainAboutusPage";
import LogInPage from "./Components/Login/LogInPage";
import ShowNavbar from "./Components/ShowNavbar/ShowNavbar";




const App = () => {


  
  return (
    <BrowserRouter>
    
    <ShowNavbar>
        <MainNavBar />

    </ShowNavbar>


      <Routes>
        <Route path="/login"  element={<LogInPage />}></Route>

        <Route path={ "/" } element={<MainHomePage />}></Route>
        <Route path="/aboutus" element={<MainAboutusPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
