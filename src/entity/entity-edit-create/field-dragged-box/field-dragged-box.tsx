import * as React from "react";
import {inject, observer} from "mobx-react";
import {FIELD_STATE} from '../../entity';

@inject('entityStore') @observer
export class FieldDraggedBox extends React.Component<any> {
    state: any

    constructor(props) {
        super(props);
        this.state = {
            desc: ''
        }
    }

    componentWillMount() {
        this.state.desc = this.props.description;
    }

    render() {
        const {state, iconClassName, inputId, description} = this.props;
        return (state === FIELD_STATE.CREATED ? this.getCreated(inputId, iconClassName, description)
            : this.getEditable(inputId, iconClassName, description));
    }

    submitInput(inputId: string) {
        let desc = this.state.desc;
        this.props.entityStore.saveUserInput(inputId, desc);
    }

    handleChange = (e: any) => {
        this.setState({desc: e.target.value});
    }


    getCreated(inputId: any, iconClassName: string, description: string) {
        return (
            <div className="field-box-container created">
                <span className={`icon-section ${iconClassName}`}></span>
                <span className="description-section">{description}</span>
                <span onClick={() => this.props.entityStore.ChangeInputEditMode(inputId)}
                      className="glyphicon glyphicon-edit"></span>
            </div>);
    }

    getEditable(inputId: string, iconClassName: string, description: string) {
        return (
            <div className="field-box-container editable">
                <span className={`icon-section ${iconClassName}`}></span>
                <textarea
                    autoFocus
                    rows={3}
                    value={this.state.desc}
                    style={{resize: 'none', overflow: 'hidden'}}
                    wrap="hardsoft"
                    className="form-control description-section"
                    onChange={this.handleChange}
                    placeholder="Enter Description..."
                    required>
                </textarea>
                <div className="ok-section">
                    <span onClick={this.submitInput.bind(this, inputId)}
                          className="glyphicon glyphicon-ok"></span>
                </div>
            </div>);
    }
}