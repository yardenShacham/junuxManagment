import * as React from 'react';

export class MessageIcon extends React.Component<any> {

    constructor(props) {
        super(props);
    }

    render() {
        const {message} = this.props;
        return (
            <button onClick={() => {
                alert(message ? message : "No Number")
            }}>Show Phone Number</button>
        );
    }
}

