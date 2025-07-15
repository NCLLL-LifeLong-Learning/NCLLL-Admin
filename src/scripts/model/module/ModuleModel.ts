export const createModule = (data: Partial<ModuleModel> = {}): ModuleModel => ({
    id: data._id || undefined,
    en: data?.en || {
        title: '',
        description: '',
        document: {
            content: '',
        },
    } as BlogInfo,
    kh: data?.kh || {
        title: '',
        description: '',
        document: {
            content: '',
        },
    } as BlogInfo,
    mainCategory: data?.mainCategory || '',
    subCategory: data.subCategory || '',
    cover: data.cover || "",
});

export default interface ModuleModel {
    id?: string;
    _id?: string;
    en: BlogInfo;
    kh: BlogInfo;
    subCategory: string;
    mainCategory: string;
    cover: string;
}

export interface BlogInfo {
    title: string;
    description: string;
    document: object;
}
