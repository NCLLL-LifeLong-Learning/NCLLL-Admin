const BASE_URL = import.meta.env.VITE_API_URL;

const tagAPI = (_id?: string) => {
    return {
        create_tag               :       BASE_URL + "/tag",
        retrive_tag              :       BASE_URL + "/tag",
        delete_tag               :       BASE_URL + "/tag/" + _id,
        update_tag               :       BASE_URL + "/tag"
    }
}


export default { tagAPI }