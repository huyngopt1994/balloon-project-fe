import React from 'react';
import logo from './logo.svg';
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
            <Footer/>
        </Router>
    );
}

export default App;
