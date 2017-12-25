import * as React from "react";

export class BackgroundList extends React.Component<any> {

    componentDidMount() {
    }

    render() {
        return (
            <div className="background-list">
                <div className="title">
                    <span>Uploaded Backgrounds</span>
                </div>
                <div className="apply-background">Apply to Other Pages</div>
            </div>);
    }
}