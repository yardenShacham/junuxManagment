export class StyleService {

    setStyleListener(styleVarName: string, getValue: any) {
        if (styleVarName && getValue)
            document.documentElement.style.setProperty(styleVarName, getValue());
    }

    setElementStyleListener(element: any, styleVarName: string, getValue: any) {
        if (styleVarName && getValue)
            element.style.setProperty(`--${styleVarName}`, getValue());
    }

    getElementStyle(element: any, styleVarName: string) {
        return element.style.getPropertyValue(styleVarName);
    }
}