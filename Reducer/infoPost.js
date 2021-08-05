var infoPost = (state = {
    TypeAuthor: "", NameAuthor: "", address: "", title: "", note: "", accountID: "", NameProduct: "", image: [{
        "albumId": "-1313584517",
        "creationTime": 1627833124565,
        "duration": 0,
        "filename": "Screenshot_20210801-225204_Facebook.jpg",
        "height": 2400,
        "id": "3215",
        "mediaType": "photo",
        "modificationTime": 1627833124000,
        "uri": "file:///storage/emulated/0/DCIM/Screenshots/Screenshot_20210801-225204_Facebook.jpg",
        "width": 1080,
    }]
}, action) => {
    switch (action.type) {
        case 'CONFIRM_ADDRESS':
            return {
                ...state,
                address: action.address
            };
        case 'GET_NAME':
            return {
                ...state,
                NameProduct: action.NameProduct
            }
        case 'GET_TITLE':
            return {
                ...state,
                title: action.title
            }
        case 'GET_NOTE':
            return {
                ...state,
                note: action.note
            }
        case 'GET_IMG':
            return {
                ...state,
                image: action.image
            }
        default:
            return state
    }
}

export default infoPost;