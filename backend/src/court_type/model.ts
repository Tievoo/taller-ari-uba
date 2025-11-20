import { BaseModel } from "../base/BaseModel";

export type CourtType = {
    id: string;
    name: string;
    price: number;
};

export const CourtTypeModel = new BaseModel<CourtType>('court_type');