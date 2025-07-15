const BASE_URL = import.meta.env.VITE_API_URL;

const blogAPI = ({ id, limit, page, type }: { id?: string; limit?: number; page?: number; type?: string } = {}) => {
    return {
        create_blog               :       BASE_URL + "/blog",
        retrive_blog_one          :       BASE_URL + "/blog/" + id,
        soft_delete_blog          :       BASE_URL + "/blog/soft/" + id,
        retrive_blog              :       BASE_URL + "/blog?limit=" + limit + "&page=" + page + (type == '' ? '' : ("&category[]=" + type)),
        delete_blog               :       BASE_URL + "/blog/" + id,
        update_blog               :       BASE_URL + "/blog"
    }
}


export default { blogAPI }