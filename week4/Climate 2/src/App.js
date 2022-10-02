import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layouts/Header";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Articles from "./components/Articles";


function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route to="/articles" component={Articles} />
      </Routes>
      <Footer />
     
    </div>
  );
}

export default App;