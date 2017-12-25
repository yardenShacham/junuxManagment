import * as React from "react";

export class BtnInput extends React.Component<any> {
    state: any

    constructor(props) {
        super(props);
        this.state = {
            txt: ''
        }
    }

    render() {
        let {style, inputStyle, placeholder, onClick, btnLabelName} = this.props;
        let {txt} = this.state;
        return (
            <div className="btn-input-container" style={style}>
                <input type="text" className="form-control"
                       style={inputStyle}
                       onChange={(e: any) => this.setState({
                           txt: e.target.value
                       })}
                       placeholder={placeholder} required/>
                {
                    txt.length ? <button onClick={() => onClick(txt)} className="btn" type="button">
                        <span className="btn-input-label-name">{btnLabelName}</span>
                    </button> : null
                }
            </div>
        );
    }
}