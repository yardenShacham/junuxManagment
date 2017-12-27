import {IdNameContainer} from '../app.types';

export const FIELD_STATE = {
    CREATED: 1,
    EDITABLE: 2
}

export interface Entity {
    /*  entityId: any
      fields: Field[]
      pages: PageInfo[]*/
}

export interface PageInfo {
    pageId: number
    pageTitle: string
}

export interface Field {
    id: string
    type: IdNameContainer<number>
    name: string
    rulls: FieldRulls
}

export interface FieldRulls {
    maxLength: number
    largerThen: number
    smallerThen: number
    customValidation: any
}
