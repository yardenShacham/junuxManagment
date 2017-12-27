import {
    action,
    observable,
    runInAction,
    computed
} from 'mobx';
import {appInjector} from '../core/appInjector';

class ViewStore {

    constructor(initialStore: any) {
        this.currentView = null;
        this.uploadedImages = [];
        this.getAllViews();
    }

    @observable allViews;
    @observable searchViewName: string;
    @observable selectedEntityId: any;
    @observable currentView: any
    @observable uploadedImages: any[]

    //<editor-fold desc="All Views Actions">
    @computed
    get searchedViews() {
        return this.allViews ? this.allViews.filter((view: any) => {
            let isViewRelated = this.selectedEntityId ?
                view.relatedEntitiesIds.find((i: any) => i === this.selectedEntityId) : true;

            let isContainName = this.searchViewName ? view.name.toLowerCase()
                .includes(this.searchViewName.toLowerCase()) : true;
            return isViewRelated && isContainName;
        }) : []
    }

    @action
    searchViews(entityId: any, viewName: string) {
        this.selectedEntityId = entityId;
        this.searchViewName = viewName;
    }

    @action
    removeView = (viewId: any) => {
        appInjector.get('viewService').removeView(viewId)
            .then(() => this.getAllViews());
    }

    @action
    getAllViews() {
        appInjector.get('viewService').getViews().then((views: any[]) => {
            if (views) {
                runInAction(() => {
                    this.allViews = views;
                });
            }
        });
    }

    //</editor-fold>

    relatedEntitiesIds: any = ["User1"];

    @action
    getViewById(id: any) {
        if (id === 'new' && this.relatedEntitiesIds) {
            this.currentView = this.getDefaultView();
        }
        else {
            let foundView = this.allViews.find((view: any) => view.id === id);
            if (foundView)
                this.currentView = foundView;
        }
    }


    @action
    uploadImage(imgFile: any) {
        let savedImg = {
            fileName: '',
            mimeType: '',
            base64: imgFile.result.replace('', '')
        }
        appInjector.get('viewService').uploadImage()
    }

    getDefaultView() {
        return {
            content: {},
            name: '',
            relatedEntitiesIds: this.relatedEntitiesIds,
            viewId: ''
        };
    }

    setCurrentEntityId(relatedEntitiesIds: any[]) {
        this.relatedEntitiesIds = relatedEntitiesIds;
    }

}

export function getViewStore(initialState: any) {
    return new ViewStore({});
}