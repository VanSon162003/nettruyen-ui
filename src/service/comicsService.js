import httpRequest from "../utils/httpRequest";

export const getAll = async (data) => {
    const result = await httpRequest.get(
        `/comics?page=${data.page}&limit=${data.limit}`
    );

    return result;
};

export const getPopular = async () => {
    const result = await httpRequest.get(`/comics/popular`);

    return result;
};

export const getBySlug = async (slug) => {
    const result = await httpRequest.get(`/comics/${slug}`);

    return result;
};

export default {
    getAll,
    getPopular,
    getBySlug,
};
