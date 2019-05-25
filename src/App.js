import React from 'react';
import AboutUs from './modules/AboutUs'
import AdminCompanyForm from './modules/AdminCompanyForm'
import AdminCompanyList from './modules/AdminCompanyList'
import './App.css';
import AdminCompanyUpdatedForm from './modules/AdminCompanyUpdatedForm'
import AdminProductList from './modules/AdminProductList'
import AdminTransactionList from './modules/AdminTransactionList'
import ContactUs from './modules/ContactUs'
import Home from './modules/Homes'
import Login from './modules/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Services from './modules/Services'

function App() {
    return (
        <Router>
            <Route exact path='/' component={Home}/>
            <Route exact path='/about-us' component={AboutUs}/>
            <Route exact path='/contact-us' component={ContactUs}/>
            <Route exact path='/services' component={Services}/>
            <Route exact path='/admin' component={AdminCompanyList}/>
            <Route exact path='/admin/company/create' component={AdminCompanyForm}/>
            <Route exact path='/admin/company/:id(\d+)' component={AdminCompanyUpdatedForm}/>
            <Route exact path='/admin/product' component={AdminProductList} />
            <Route exact path='/admin/transaction' component={AdminTransactionList} />
            <Route path='/admin/auth' component={Login}/>
        </Router>
    );
}

export default App;
