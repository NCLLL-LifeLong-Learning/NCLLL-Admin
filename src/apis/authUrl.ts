const BASE_URL = import.meta.env.VITE_API_URL;

const authAPI = ({ limit, page }: { limit?: number; page?: number } = {}) => {
    return {
        user_login               :       BASE_URL + "/auth/login",
        file_upload              :       BASE_URL + "/upload",
        maintainence             :       BASE_URL + "/settings",
        check_me                 :       BASE_URL + "/auth/me",
        user_list                :       BASE_URL + "/admin" + "?limit=" + limit + "&page=" + page,
        user_role                :       BASE_URL + "/role",
        user_create              :       BASE_URL + "/admin?limit=100&page=1",
    }
}


export default { authAPI }