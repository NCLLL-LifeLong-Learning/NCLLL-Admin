const BASE_URL = import.meta.env.VITE_API_URL;

const moduleAPI = ({ id, limit, page, mainCategory, subCategory }: { id?: string; limit?: number; page?: number;  mainCategory?: string; subCategory?: string } = {}) => {
    return {
        create_module               :       BASE_URL + "/modules",
        retrive_module_one          :       BASE_URL + "/modules/" + id,
        soft_module_blog            :       BASE_URL + "/modules/soft/" + id,
        retrive_module              :       BASE_URL + "/modules?mainCategory=" + mainCategory + "&subCategory=" + subCategory + "&limit=" + limit + "&page=" + page,
        delete_module               :       BASE_URL + "/modules/" + id,
        update_module               :       BASE_URL + "/modules"
    }
}


export default { moduleAPI }