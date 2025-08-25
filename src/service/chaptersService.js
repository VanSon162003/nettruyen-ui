import httpRequest from "../utils/httpRequest";

export const getBySlug = async (id) => {
    const result = await httpRequest.get(`/chapters/${id}`);

    return result;
};

export default {
    getBySlug,
};
