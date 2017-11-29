export interface ViewStyle {
    backgroundColor: string
}

export interface ViewConfiguration {
    style: ViewStyle
    gridSize: {
        totalRows: number
        totalCoulmns: number
    }
}

export interface ViewContent {
    config: ViewConfiguration

}

export interface View {
    viewId: string
    name: string
    relatedEntitiesIds: string[]
    content: ViewContent
}