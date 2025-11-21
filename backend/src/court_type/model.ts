import { BaseModel } from "../base/BaseModel";

export type CourtType = {
    id: string;
    name: string;
    price: number;
};

class CourtTypeModelClass extends BaseModel<CourtType> {
    constructor() {
        super('court_type');
        this.addCascadeDependency('courts', 'court_type_id');
    }
}

export const CourtTypeModel = new CourtTypeModelClass();