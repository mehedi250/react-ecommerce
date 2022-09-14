import { sendRequest } from "./rootApi";

export const registerApi = async (payload) => {
    return sendRequest(payload);
}