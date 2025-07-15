export const createPosition = (data: Partial<PositionModel> = {}): PositionModel => ({
    id: data._id || undefined,
    en: data.en || {} as PositionLevel,
    kh: data.kh || {} as PositionLevel
})


export default interface PositionModel {
    id?: string | undefined;
    _id?: string | undefined;
    en: PositionLevel;
    kh: PositionLevel;
}

export interface PositionLevel {
    title: string ;
    level: number;
}

