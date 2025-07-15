import moduleAPI from "../../../apis/moduleUrl.ts";
import type ApiResponse from "../../mapping/BaseResponse.ts";
import { getCookie } from "../../cookie/cookie.ts";
import type ModuleModel from "@/scripts/model/module/ModuleModel.ts";

export const createModuleHandler = async (params: ModuleModel) => {
    try {
        const response = await fetch(moduleAPI.moduleAPI().create_module, {
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

export const updateModuleHandler = async (params: ModuleModel) => {
    try {
        const response = await fetch(moduleAPI.moduleAPI().update_module, {
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

export const removeModuleHandler = async (Module: ModuleModel) => {
    try {
        const response = await fetch(moduleAPI.moduleAPI({ id: Module._id }).delete_module, {
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

export const removeSoftModuleHandler = async (Module: ModuleModel) => {
    try {
        const response = await fetch(moduleAPI.moduleAPI({ id: Module._id }).soft_module_blog, {
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

export const retriveModuleHandler = async({mainCategory = '', subCategory = '', limit = 5, page = 1 }) => {
    try {
        const response = await fetch(moduleAPI.moduleAPI({ mainCategory: mainCategory, subCategory: subCategory, limit, page }).retrive_module, {
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

export const retriveOneModuleHandler = async (_id: string) => {
    try {
        const response = await fetch(moduleAPI.moduleAPI({ id: _id }).retrive_module_one, {
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


