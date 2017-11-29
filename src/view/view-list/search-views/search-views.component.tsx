import * as React from "react";
import {inject, observer} from "mobx-react";
import Select from 'react-select';


@inject('viewsStore', 'entityStore') @observer
export class SearchViews extends React.Component<any> {

    state: any;
    refs: any

    constructor(props: any) {
        super(props);
        this.state = {
            selectedEntity: null
        }
        props.entityStore.getEntities();
    }

    onViewNameChange = (value: any) => {
        this.setState({viewInfo: value})
    }

    componentDidMount() {
        document.body.addEventListener('keyup', this.searchOnEnter);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keyup', this.searchOnEnter);

    }

    searchOnEnter = (e: any) => {
        if (e.keyCode === 13) {
            this.startSearch();
        }
    }

    startSearch = () => {
        this.props.viewsStore
            .searchViews(this.state.selectedEntity, this.refs.viewName.value);
    }

    render() {
        const {entities} = this.props.entityStore;
        return (
            <div className="insert-entity-container">
                <div className="search-item">
                    <Select
                        options={entities.map((e: any) => {
                            return {
                                value: e.entityId,
                                label: e.name
                            };
                        })}
                        value={this.state.selectedEntity}
                        placeholder="Select entity name..."
                        onChange={(selected) => {
                            this.setState({
                                selectedEntity: selected ? selected.value : null
                            });
                        }}/>
                </div>
                <div className="search-item">
                    <input type="text" className="form-control"
                           ref="viewName"
                           placeholder="Select view name..."/>
                </div>
                <button type="button"
                        onClick={this.startSearch}
                        className="btn btn-success">
                    <span>Search</span>
                </button>
            </div>);
    }
}