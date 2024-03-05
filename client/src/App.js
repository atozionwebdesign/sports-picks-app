import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Import pages and components
import Admin from "./pages/Admin";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
// Styles
import "./App.css";

import { loggedInSelector, userSelector } from "./redux/selectors";

function App() {
  return (
    <div className="App">
      {/* <div className="app-div"> */}
        
        <Router>
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="/admin" element={<Admin />} />
            </Routes>
          </>
        </Router>
      {/* </div> */}
    </div>
  );
}

export default App;
