const BASE_URL = import.meta.env.VITE_API_URL;

const memberAPI = (_id?: string) => {
    return {
        create_member               :       BASE_URL + "/member",
        retrive_member              :       BASE_URL + "/member",
        delete_member               :       BASE_URL + "/member/" + _id,
        update_member               :       BASE_URL + "/member",

        create_view_sgll                :       BASE_URL + "/sglll-tree" + `${_id ? "/" + _id : ""}`,
    }
}


export default { memberAPI }