import * as React from "react";

export class UploadImgViewer extends React.Component<any> {
    state: { file: string, imagePreviewUrl: string }

    componentDidMount() {
    }

    constructor(props) {
        super(props);
        this.state = {file: '', imagePreviewUrl: ''};
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }


    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl}/>);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image...</div>);
        }
        return (

            <div className="img-viewer">
                <div className="img-preview">
                    {$imagePreview}
                </div>
                <form>
                    <input className="fileInput"
                           id="in"
                           type="file"
                           onChange={(e) => this._handleImageChange(e)}/>
                    <div className="action-panel">
                        <div className="action-btn">
                            <label className="glyphicon glyphicon-upload" htmlFor="in"></label>
                        </div>
                        {imagePreviewUrl ?
                            <span onClick={this.props.onUploadImg}
                                  className="action-btn glyphicon glyphicon-ok"></span> : null}

                    </div>
                </form>
            </div>);
    }
}