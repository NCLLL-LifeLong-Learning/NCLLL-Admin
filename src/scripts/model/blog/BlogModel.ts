export const createBlog = (data: Partial<BlogModel> = {}): BlogModel => ({
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
    category: data?.category || '',
    status: data.status || '',
    tags: data.tags || [],
    source: data.source || '',
    cover: data.cover || '',

});

export default interface BlogModel {
    id?: string;
    _id?: string;
    en: BlogInfo;
    kh: BlogInfo;
    category: string;
    status: string;
    tags: string[];
    source: string;
    cover: string;
}

export interface BlogInfo {
    title: string;
    description: string;
    document: object;
}
