var myPost = (state = [], action) => {
 switch (action.type) {
     case 'UP':
         {
             return [...action.data];
         }
     default:
         return state;
 }
}

export default myPost;