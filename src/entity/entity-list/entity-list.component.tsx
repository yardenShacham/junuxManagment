import * as React from "react";
import {inject, observer} from "mobx-react";
import {DynamicTable, Configurations} from '../../common/dynamic-table';

@inject('entityStore') @observer
export class EntityList extends React.Component<any> {

    componentWillMount() {
        this.props.entityStore.getEntities();
    }

    componentDidMount() {
    }

    goToEdit(entityId: any) {
        this.props.history.push(`/entities/${entityId}`);
    }

    render() {
        const tableColor = "grey"
        let configurations: Configurations = {
            options: [{
                sort: {
                    sortBy: (data: any) => data.name
                },
                header: () => "Entity Name",
                content: {
                    getValue: (data: any) => data.name
                }
            }, {
                sort: {
                    sortBy: (data: any) => data.name
                },
                header: () => "Total Fields",
                content: {
                    getValue: (data: any) => data.fields ? data.fields.length : "None"
                }
            }, {
                header: () => "",
                content: {
                    displayValue: (data: any) =>
                        (<span onClick={this.goToEdit.bind(this, data.entityId)}
                               style={{cursor: 'pointer'}}
                               className="glyphicon glyphicon-edit"></span>)
                }
            }],

            styles: {
                header: {
                    backgroundColor: tableColor,
                    color: "white",
                    fontSize: "15px",
                    border: "",
                    cornersRadius: "",
                    minHeight: "35px"
                },
                content: {
                    borderSidesRull: `0.5px solid ${tableColor}`,
                    cell: {
                        backgroundColor: "transparent",
                        opacity: "",
                        color: "white",
                        fontSize: "20px",
                        minHeight: "",
                        borderBottom: `0.5px solid ${tableColor}`,
                        borderLeft: ``,
                        borderRight: "",
                        cellMargin: "5px 0 0 0"
                    }
                }
            }
        }
        return (
            <div className="entity-list">
                <h2>All Entities</h2>
                <DynamicTable data={this.props.entityStore.entities} configurations={configurations}></DynamicTable>
            </div>);
    }
}