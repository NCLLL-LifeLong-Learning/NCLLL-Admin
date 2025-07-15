import blogAPI from "../../../apis/blogUrl.ts";
import type ApiResponse from "../../mapping/BaseResponse.ts";
import { getCookie } from "../../cookie/cookie.ts";
import type BlogModel from "@/scripts/model/blog/BlogModel.ts";

export const createBlogHandler = async (params: BlogModel) => {
    try {
        const response = await fetch(blogAPI.blogAPI().create_blog, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('userToken')}`,
            },
            body: JSON.stringify(params),
        });

        const data = (await response.json()) as ApiResponse;

        return {
            message: data.message as string || '',
            data: data.data as any || null,
            statusCode: data.code as number
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
        };
    }
};

export const updateBlogHandler = async (params: BlogModel) => {
    try {
        const response = await fetch(blogAPI.blogAPI().update_blog, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('userToken')}`,
            },
            body: JSON.stringify(params),
        });

        const data = (await response.json()) as ApiResponse;

        return {
            message: data.message as string || '',
            data: data.data as any || null,
            statusCode: data.code as number
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
        };
    }
};

export const removeBlogHandler = async (blog: BlogModel) => {
    try {
        const response = await fetch(blogAPI.blogAPI({ id: blog._id }).delete_blog, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('userToken')}`,
            },
        });

        const data = (await response.json()) as ApiResponse;

        return {
            message: data.message as string || '',
            data: data.data as any || null,
            statusCode: data.code as number
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
        };
    }
};

export const removeSoftBlogHandler = async (blog: BlogModel) => {
    try {
        const response = await fetch(blogAPI.blogAPI({ id: blog._id }).soft_delete_blog, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('userToken')}`,
            },
        });

        const data = (await response.json()) as ApiResponse;

        return {
            message: data.message as string || '',
            data: data.data as any || null,
            statusCode: data.code as number
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
        };
    }
};

export const retriveBlogHandler = async({ limit = 5, page = 1, type = '' }) => {
    try {
        const response = await fetch(blogAPI.blogAPI({ limit, page, type }).retrive_blog, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('userToken')}`,
            },
        });

        const data = (await response.json()) as ApiResponse;

        return {
            message: data.message as string || '',
            data: data.data as any || null,
            statusCode: data.code as number
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
        };
    }
};

export const retriveOneBlogHandler = async (_id: string) => {
    try {
        const response = await fetch(blogAPI.blogAPI({ id: _id }).retrive_blog_one, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('userToken')}`,
            },
        });

        const data = (await response.json()) as ApiResponse;

        return {
            message: data.message as string || '',
            data: data.data as any || null,
            statusCode: data.code as number
        };
    } catch (error) {
        console.error(error);
        return {
            data: null,
        };
    }
};


