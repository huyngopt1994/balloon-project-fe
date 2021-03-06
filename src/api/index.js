import axios from 'axios';
import env from '../environments'

export function getProductList(params = {}) {
    return axios.get(`${env.BACKEND_URL}/product`, { params: params })
}

export function getProductOne(productId) {
    return axios.get(`${env.BACKEND_URL}/product/${productId}`)
}

export function createProduct(productData) {
    let bodyFormData = new FormData();
    Object.entries(productData).map(data => {

        bodyFormData.append(data[0], data[1])

    })

    return axios.post(`${env.BACKEND_URL}/product/`, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
    })
}

export function updateProduct(productId, productData) {
    let bodyFormData = new FormData();
    Object.entries(productData).map(data => {

        bodyFormData.append(data[0], data[1])

    })

    return axios.put(`${env.BACKEND_URL}/product/${productId}/`, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
    })
}

export function getCompanyList(params = {}) {
    return axios.get(`${env.BACKEND_URL}/admin/company`, { params: params })
}

export function getCompanyOne(companyId) {
    return axios.get(`${env.BACKEND_URL}/admin/company/${companyId}`)
}

export function createCompany(companyData) {
    let bodyFormData = new FormData();
    Object.entries(companyData).map(data => {

        bodyFormData.append(data[0], data[1])

    })

    return axios.post(`${env.BACKEND_URL}/admin/company/`, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
    })
}

export function updateCompany(companyId, companyData) {
    let bodyFormData = new FormData();
    Object.entries(companyData).map(data => {

        bodyFormData.append(data[0], data[1])

    })
    return axios.put(`${env.BACKEND_URL}/admin/company/${companyId}/`, bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
    })
}

export function getTransactionList(params = {}) {
    return axios.get(`${env.BACKEND_URL}/admin/transaction`, { params: params })
}

export function getTransactionOne(transactionId) {
    return axios.get(`${env.BACKEND_URL}/admin/transaction/${transactionId}`)
}

export function createTransaction(transactionData) {
    return axios.post(`${env.BACKEND_URL}/admin/transaction/`, transactionData)
}

function updateTransaction(transactionId, transactionData) {
    return axios.put(`${env.BACKEND_URL}/admin/transaction/${transactionId}`, transactionData)
}
