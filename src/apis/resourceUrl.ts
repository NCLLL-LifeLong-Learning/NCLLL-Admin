const BASE_URL = import.meta.env.VITE_API_URL;

const resourceAPI = ({ id, limit, page, type }: { id?: string; limit?: number; page?: number; type?: string } = {}) => {
    return {
        create_resource               :       BASE_URL + "/resource",
        retrive_resource              :       BASE_URL + "/resource?limit=" + limit + "&page=" + page + "&type=" + type,
        delete_resource               :       BASE_URL + "/resource/" + id,
        update_resource               :       BASE_URL + "/resource"
    }
}


export default { resourceAPI }