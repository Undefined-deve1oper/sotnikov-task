import axiosConfig from "./axiosConfig";

const ticketEndpoint = "ticket/";

const ticketService = {
    fetchAll: async () => {
        const { data } = await axiosConfig.get(ticketEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await axiosConfig.post(ticketEndpoint, payload);
        return data;
    },
    confirm: async (id, payload) => {
        const { data } = await axiosConfig.put(ticketEndpoint + id, payload);
        return data;
    },
    remove: async (id) => {
        const { data } = await axiosConfig.delete(ticketEndpoint + id);
        return data;
    }
};

export default ticketService;
