import httpRequest from "../utils/httpRequest";

export const getAll = async () => {
    const result = await httpRequest.get(`/genres`);

    return result;
};

export default {
    getAll,
};
