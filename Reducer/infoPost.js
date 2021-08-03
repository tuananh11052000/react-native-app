var infoPost = (state = {
    TypeAuthor: "", NameAuthor: "", address: "", title: "", note: "", accountID: "", NameProduct: "", image: [{
        "albumId": "-1799767402",
        "creationTime": 1627666660000,
        "duration": 0,
        "filename": "VideoCapture_20210731-005254.jpg",
        "height": 656,
        "id": "3168",
        "mediaType": "photo",
        "modificationTime": 1627667574000,
        "uri": "file:///storage/emulated/0/DCIM/Videocaptures/VideoCapture_20210731-005254.jpg",
        "width": 368,
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