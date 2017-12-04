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
    },
    {
        dropdownName: 'Views',
        dropdown: [{
            linkTo: '/views',
            label: 'Show All Views'
        }, {
            linkTo: '/views/new/m',
            label: 'Create Mobile View'
        }, {
            linkTo: '/views/new',
            label: 'Create View'
        }]
    }
]