var countNumber = (state = 1, action) => {
    switch (action.type) {
        case 'ADD':
            {
                return state + 1;
            }
        case 'SUB':
            {
                return state -1;
            }
        default:
            return state;
    }
}

export default countNumber;