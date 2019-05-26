import React from 'react';
import AboutUs from './modules/AboutUs'
import AdminCompanyForm from './modules/AdminCompanyForm'
import AdminCompanyList from './modules/AdminCompanyList'
import './App.css';
import AdminCompanyUpdatedForm from './modules/AdminCompanyUpdatedForm'
import AdminProductForm from './modules/AdminProductForm'
import AdminProductList from './modules/AdminProductList'
import AdminProductUpdatedForm from './modules/AdminProductUpdatedForm'
import AdminTransactionForm from './modules/AdminTransactionForm'
import AdminTransactionList from './modules/AdminTransactionList'
import AdminTransactionReadForm from './modules/AdminTransactionReadForm'
import ContactUs from './modules/ContactUs'
import Home from './modules/Homes'
import Login from './modules/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Services from './modules/Services'

function App() {
    return (
        <Router>
            {/*<Route exact path='/' component={Home}/>*/}
            {/*<Route exact path='/about-us' component={AboutUs}/>*/}
            {/*<Route exact path='/contact-us' component={ContactUs}/>*/}
            {/*<Route exact path='/services' component={Services}/>*/}
            <Route exact path='/admin' component={AdminCompanyList}/>
            <Route exact path='/admin/company/create' component={AdminCompanyForm}/>
            <Route exact path='/admin/company/:id(\d+)' component={AdminCompanyUpdatedForm}/>
            <Route exact path='/admin/product' component={AdminProductList} />
            <Route exact path='/admin/product/create' component={AdminProductForm}/>
            <Route exact path='/admin/product/:id(\d+)' component={AdminProductUpdatedForm} />
            <Route exact path='/admin/transaction' component={AdminTransactionList} />
            <Route exact path='/admin/transaction/create' component={AdminTransactionForm}/>
            <Route exact path='/admin/transaction/:id(\d+)' component={AdminTransactionReadForm} />
            <Route path='/admin/auth' component={Login}/>
        </Router>
    );
}

export default App;
