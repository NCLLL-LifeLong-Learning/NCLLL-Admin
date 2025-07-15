export const createPartner = (data: Partial<PartnerModel> = {}): PartnerModel => ({
  id: data._id || undefined,
  en: data.en || {
    name: '',
    description: '',
    lang: 'en',
  } as ParnterInfo,
  kh: data.kh || {
    name: '',
    description: '',
    lang: 'kh',
  } as ParnterInfo,
  url: data.url || '',
  logo: data.logo || '',
})

export default interface PartnerModel {
  id?: string;
  _id?: string;
  en: ParnterInfo;
  kh: ParnterInfo;
  url: string;
  logo: string;
}

export interface ParnterInfo {
  name: string;
  description: string;
  lang: string;
}
