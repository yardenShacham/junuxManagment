import * as React from "react";
import {inject, observer} from "mobx-react";
import {UploadImgViewer} from '../../../common/upload-img-viewer';
import {BackgroundList} from '../../../common/background-list';

@inject('viewsStore') @observer
export class BackgroundHandler extends React.Component<any> {

    componentDidMount() {
    }

    render() {
        const {uploadedImages, uploadImage} = this.props.viewsStore;
        return (
            <React.Fragment>
                <UploadImgViewer onUploadImg={uploadImage}/>
                <BackgroundList images={uploadedImages}/>
            </React.Fragment>);
    }
}