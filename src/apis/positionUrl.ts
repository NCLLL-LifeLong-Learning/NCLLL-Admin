const BASE_URL = import.meta.env.VITE_API_URL;

const positionAPI = (_id?: string) => {
    return {
        create_position:                BASE_URL + "/position",
        retrive_position:               BASE_URL + "/position",
        update_position:                BASE_URL + "/position",
        delete_position:                BASE_URL + "/position/" + _id
    }
}


export default { positionAPI }