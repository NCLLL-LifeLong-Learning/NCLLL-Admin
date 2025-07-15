export const createSponsor = (data: Partial<SponsorModel> = {}): SponsorModel => ({
    id: data._id || '',
    en: data.en || {} as SponsorInfo,
    kh: data.kh || {} as SponsorInfo
})

export default interface SponsorModel {
    id?: string;
    _id?: string;
    en: SponsorInfo;
    kh: SponsorInfo;
}

export interface SponsorInfo {
    name: string;
    description: string;
    imageUrl: string;
}
