import authAPI from "../../../apis/authUrl.ts";
import { getCookie, setCookie } from "../../cookie/cookie.ts";
import type LoginModel from "../../model/auth/AuthModel.ts";
import type ApiResponse from "../../mapping/BaseResponse.ts";
import type LoginResponse from "../../mapping/Auth.ts";
import { useMainStore } from "../../../stores/useMainStore.ts";

export const userLoginHandler = async (params: LoginModel) => {
  try {
    const response = await fetch(authAPI.authAPI().user_login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as ApiResponse<LoginResponse>;

    if (data && data.data?.token) {
      setCookie("userToken", data.data?.token);
      await checkMe();
    }

    return {
      message: (data.message as string) || "",
      data: (data.data as LoginResponse) || null,
      statusCode: data.code as number,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
    };
  }
};

export const userListHandler = async ({ limit, page }: { limit: number; page: number }) => {
  try {
    const response = await fetch(authAPI.authAPI({ limit, page }).user_list, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("userToken")}`,
      },
    });

    const data = (await response.json()) as ApiResponse<LoginResponse>;

    return {
      message: (data.message as string) || "",
      data: (data.data as any) || null,
      statusCode: data.code as number,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
    };
  }
};

export const userCreateHandler = async (params: object) => {
  try {
    const response = await fetch(authAPI.authAPI().user_create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("userToken")}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as ApiResponse<LoginResponse>;

    return {
      message: (data.message as string) || "",
      data: (data.data as any) || null,
      statusCode: data.code as number,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
    };
  }
};

export const userUpdateHandler = async (params: object) => {
  try {
    const response = await fetch(authAPI.authAPI().user_create, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("userToken")}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as ApiResponse<LoginResponse>;

    return {
      message: (data.message as string) || "",
      data: (data.data as any) || null,
      statusCode: data.code as number,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
    };
  }
};

export const userRoleHandler = async () => {
  try {
    const response = await fetch(authAPI.authAPI().user_role, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("userToken")}`,
      },
    });

    const data = (await response.json()) as ApiResponse<LoginResponse>;

    return {
      message: (data.message as string) || "",
      data: (data.data as any) || null,
      statusCode: data.code as number,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
    };
  }
};

export const checkMe = async () => {
  try {
    const response = await fetch(authAPI.authAPI().check_me, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("userToken")}`,
      },
    });

    const data = (await response.json()) as ApiResponse;

    if (data.code == 200) {
      const _useStore = useMainStore();
      _useStore.$state.user = {
        name: data.data.name as string,
        role: {
          id: data.data.role._id as string,
          name: data.data.role.name as string,
          code: data.data.role.code as string,
        },
      };
      setCookie("userRole", data.data?.role?.code as string);
    }

    return {
      message: (data.message as string) || "",
      data: (data.data as any) || null,
      statusCode: data.code as number,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
    };
  }
};

export const updateSettingHandler = async (params: any) => {
  try {
    const response = await fetch(authAPI.authAPI().maintainence, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("userToken")}`,
      },
      body: JSON.stringify(params),
    });

    const data = (await response.json()) as ApiResponse;

    return {
      message: (data.message as string) || "",
      data: (data.data as any) || null,
      statusCode: data.code as number,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
    };
  }
};

export const retriveSettingHandler = async () => {
  try {
    const response = await fetch(authAPI.authAPI().maintainence, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("userToken")}`,
      },
    });

    const data = (await response.json()) as ApiResponse;

    return {
      message: (data.message as string) || "",
      data: (data.data as any) || null,
      statusCode: data.code as number,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
    };
  }
};
