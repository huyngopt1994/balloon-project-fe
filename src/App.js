import React from 'react';
import AboutUs from './modules/AboutUs'
import ContactUs from './modules/ContactUs'
import './App.css';
import Navigator from './components/Navigator';
import Footer from './components/Footer';
import Services from './modules/Services'
import Home from './modules/Homes';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
    return (
        <Router>
            <Navigator/>
            <Route exact path='/' component={Home}/>
            <Route exact path='/about-us' component={AboutUs}/>
            <Route exact path='/contact-us' component={ContactUs}/>
            <Route exact path='/services' component={Services}></Route>
            <Footer/>
        </Router>
    );
}

export default App;
