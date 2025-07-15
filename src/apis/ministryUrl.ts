const BASE_URL = import.meta.env.VITE_API_URL;

const ministryAPI = (_id?: string) => {
    return {
        create_ministry               :       BASE_URL + "/ministry",
        retrive_ministry              :       BASE_URL + "/ministry",
        delete_ministry               :       BASE_URL + "/ministry/" + _id,
        update_ministry               :       BASE_URL + "/ministry"
    }
}


export default { ministryAPI }  