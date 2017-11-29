import * as React from 'react'

export const ListItem = (props: any) => {
    const {viewInfo, onRemove, onEdit} = props;
    return (
        <div className="list-item">
            <div className="details" style={{padding: '10px'}}>{viewInfo.name}</div>
            <div className="actions"
                 onClick={() => onEdit ? onEdit(viewInfo) : null}
                 style={{padding: '10px'}}>
                <span className="action-item glyphicon glyphicon-edit"></span>
                <div className="separate-item"></div>
                <span className="action-item glyphicon glyphicon-remove"
                      onClick={() => onRemove ? onRemove(viewInfo) : null}></span>
            </div>
        </div>);
}