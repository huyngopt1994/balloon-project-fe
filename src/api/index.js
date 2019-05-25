import axios from 'axios';
import env from '../environments'

export function getProductList() {
    return axios.get(`${env.BACKEND_URL}/product`, {
        headers: {},
    })
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
    return axios.put(`${env.BACKEND_URL}/product/${productId}`, productData)
}

export function getCompanyList() {
    return axios.get(`${env.BACKEND_URL}/admin/company`)
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
