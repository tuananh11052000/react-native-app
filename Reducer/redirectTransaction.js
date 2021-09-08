var redirectTransaction = (state = "gui", action) => {
    switch (action.type) {
      case "SET_GUI": {
        return "gui";
      }
      case "SET_XIN": {
        return "xin";
      }
      default:
        return state;
    }
  };
  // redirect màn hình givefor giữa createPost và category
  // redirect màn hình confirmGiveFor giữa detailPost và GiveFor
  export default redirectTransaction;
  