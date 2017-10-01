export class StyleService {

    setStyleListener(styleVarName: string, getValue: any) {
        if (styleVarName && getValue)
            document.documentElement.style.setProperty(styleVarName, getValue());
    }
}