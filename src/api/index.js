import axios from 'axios';
import env from '../environments'

export function getProductList() {
    return axios.get(`${env.BACKEND_URL}/product`, {
        headers: {
        },
    })
}

export function getProductOne(productId) {
    return axios.get(`${env.BACKEND_URL}/product/${productId}`)
}

export function createProduct(productData) {
    return axios.post(`${env.BACKEND_URL}/product`, productData)
}

export function updateProduct(productId, productData) {
    return axios.put(`${env.BACKEND_URL}/product/${productId}`, productData)
}

export function getCompanyList() {
    return axios.get(`${env.BACKEND_URL}/admin/company`)
}

export function getCompanyOne(companyId) {
    return axios.get(`${env.BACKEND_URL}/admin/company/${companyId}`)
}

export function createCompany(companyData) {
    return axios.post(`${env.BACKEND_URL}/admin/company`, companyData)
}

export function updateCompany(companyId, companyData) {
    return axios.put(`${env.BACKEND_URL}/admin/company/${companyId}`, companyData)
}

export function getTransactionList() {
    return axios.get(`${env.BACKEND_URL}/admin/transaction`)
}

export function getTransactionOne(transactionId) {
    return axios.get(`${env.BACKEND_URL}/admin/transaction/${transactionId}`)
}

export function createTransaction(transactionData) {
    return axios.post(`${env.BACKEND_URL}/admin/transaction`, transactionData)
}

function updateTransaction(transactionId, transactionData) {
    return axios.put(`${env.BACKEND_URL}/admin/transaction/${transactionId}`, transactionData)
}
