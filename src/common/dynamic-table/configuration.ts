export interface Configurations {
    styles?: TableStyles,
    options?: Options[]
}

export interface Options {
    order?: number
    header?: (value: any) => any,
    content?: {
        getValue?: (data: any) => any,
        displayValue?: (value: any) => any
    }
}

export interface TableStyles {
    header?: {
        backgroundColor?: string,
        color?: string,
        opacity?: string
        fontSize?: string
        minHeight?: string
        cornersRadius?: string
        border?: string
    },
    content?: {
        borderSidesRull?: string,
        cell?: {
            backgroundColor?: string,
            opacity?: string,
            color?: string,
            fontSize?: string,
            minHeight?: string,
            borderBottom?: string,
            borderLeft?: string,
            borderRight?: string
        }
    }
}