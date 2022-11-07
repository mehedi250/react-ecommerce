import { sendRequest } from "./rootApi";
const GET = 'get';
const POST = 'post';

export const categoryInsertApi = async (payload) => {
    return sendRequest(POST, '/api/admin/catagory-store', payload);
}