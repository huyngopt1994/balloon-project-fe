import React from 'react';
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import './App.css';
import Navigator from './components/Navigator';
import Footer from './components/Footer';
import Home from './modules/Homes';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
    return (
        <Router>
            <Navigator/>
            <Route exact path='/' component={Home}/>
            <Route exact path='/about-us' component={AboutUs}/>
            <Route exact path='/contact-us' component={ContactUs}/>
            <Footer/>
        </Router>
    );
}

export default App;
