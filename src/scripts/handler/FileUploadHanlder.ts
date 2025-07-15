import authAPI from "../../apis/authUrl.ts";
import type ApiResponse from "../mapping/BaseResponse.ts";
import { getCookie } from "../cookie/cookie.ts";


export const uploadFileHandler = async (file: File) => {
    const formData = new FormData();

    // Ensure file is a File object
    if (file instanceof File) {
        formData.append('file', file);
    } else {
        console.warn('Invalid file object:', file);
    }

    try {
        const response = await fetch(`${authAPI.authAPI().file_upload}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getCookie("userToken")}`,
            },
            body: formData,
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

