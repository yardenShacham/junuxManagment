export const NAVBAR_BRANDS = [
    {
        linkTo: '/home',
        label: 'Home'
    }, {
        dropdownName: 'Entities',
        dropdown: [{
            linkTo: '/entities',
            label: 'All Entities'
        }, {
            linkTo: '/entities/new',
            label: 'Create new entity'
        }]
    }, {
        linkTo: '/views',
        label: 'Show All Views'
    }
]