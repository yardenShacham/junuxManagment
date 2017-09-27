import * as React from "react";

export const ErrorPage = (props: any) => {
    return (<div>
        <div><h3>Error Page - {props.error.name}</h3></div>
        <div>Message: {props.error.message}</div>
        <div>Stack: {props.error.stack}</div>
    </div>);
};