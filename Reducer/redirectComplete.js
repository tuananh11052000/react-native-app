var redirectComplete = (state = "TCD", action) => {
    switch (action.type) {
      case "COMPLETE_TCD": {
        return "TCD";
      }
      case "COMPLETE_CXD": {
        return "CXD";
      }
      case "COMPLETE_GIVEFOR": {
        return "GIVEFOR";
      }
      default:
        return state;
    }
  };
  
  export default redirectComplete;
  