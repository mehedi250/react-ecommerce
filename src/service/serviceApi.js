import { sendRequest } from "./rootApi";
// const GET = 'get';
const POST = 'post';

export const categoryInsertApi = async (payload = []) => {
    return sendRequest(POST, '/api/admin/category-store', payload);
}

export const categoryListApi = async (payload = []) => {
    return sendRequest(POST, '/api/admin/category-list', payload);
}

export const categoryUpdateApi = async (id, payload = []) => {
    return sendRequest(POST, `/api/admin/category-update/${id}`, payload);
}

export const categoryDeleteApi = async (id, payload = []) => {
    return sendRequest(POST, `/api/admin/category-delete/${id}`, payload);
}

export const categoryFindApi = async (id, payload = []) => {
    return sendRequest(POST, `/api/admin/category/${id}`, payload);
}

export const categoryDropdoenApi = async (payload = []) => {
    return sendRequest(POST, '/api/admin/category-dropdown-list', payload);
}

export const dashboardDataApi = async (payload = []) => {
    return sendRequest(POST, '/api/admin/dashboard-data', payload);
}

export const productSaveApi = async (payload = []) => {
    return sendRequest(POST, '/api/admin/product-save', payload);
}

export const productListApi = async (payload = []) => {
    return sendRequest(POST, '/api/admin/product-list', payload);
}

export const productDetailsApi = async (payload = []) => {
    return sendRequest(POST, `/api/admin/product-details`, payload);
}

export const productUpdateApi = async (id, payload = []) => {
    return sendRequest(POST, `/api/admin/product-update/${id}`, payload);
}

export const categoryActiveListApi = async (payload = []) => {
    return sendRequest(POST, '/api/get-active-categories', payload);
}

export const categoryProductListApi = async (payload = []) => {
    return sendRequest(POST, '/api/get-category-products', payload);
}

export const productDataApi = async (payload = []) => {
    return sendRequest(POST, '/api/get-product-data', payload);
}