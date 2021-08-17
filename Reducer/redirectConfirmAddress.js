var controlConfirmAddress = (state = "category", action) => {
    switch (action.type) {
      case "setThreadCategory": {
        return "category";
      }
      case "setThreadCategoryCheckBox": {
        return "categoryCheckBox";
      }
      default:
        return state;
    }
  };
  
  export default controlConfirmAddress;
  