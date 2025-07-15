const BASE_URL = import.meta.env.VITE_API_URL;

const sponsorAPI = (_id?: string) => {
    return {
        create_sponsor:          BASE_URL + "/sponsor",
        retrive_sponsor:         BASE_URL + "/sponsor",
        update_sponsor:          BASE_URL + "/sponsor",
        delete_sponsor:          BASE_URL + "/sponsor/"  + _id,
    }
}


export default { sponsorAPI }