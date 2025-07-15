const BASE_URL = import.meta.env.VITE_API_URL;

const partnerAPI = ({status,_id ,limit, page}: { status?: string; _id?: string; limit?: number; page?: number }) => {
    return {
        create_partner:                 BASE_URL + "/partner",
        retrive_partner:                BASE_URL + "/partner?limit=" + 200 + "&page=" + 1,
        update_partner:                 BASE_URL + "/partner",
        delete_partner:                 BASE_URL + "/partner/" + _id,
        retrieve_request_partners:       BASE_URL + `/request-partner?${status !== "all" ? `status=${status}&` : "" }limit=${limit}&page=${page}`,
        mark_read_request:              BASE_URL + "/request-partner/" + _id  + "/seen"
    }
}


export default { partnerAPI }