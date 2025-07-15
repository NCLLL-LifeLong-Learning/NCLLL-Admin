export const createTag = (data: Partial<TagModel> = {}): TagModel => ({
    id: data._id || undefined,
    en: data.en || { name: '', lang: 'en' },
    kh: data.kh || { name: '', lang: 'kh' },
});


export default interface TagModel {
    id?: string;
    _id?: string;
    en: { name: string, lang: string };
    kh: { name: string, lang: string };
}

