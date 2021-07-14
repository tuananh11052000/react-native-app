var newestPost = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE':
            {
                return action.data;
            }
        default:
            return state;
    }
}

export default newestPost;