var redirectPostDonate = (state = "", action) => {
    switch (action.type) {
      case "SET_XIN_POSTDONATE": {
        return "XIN_POSTDONATE";
      }
      case "DEFAULT_POSTDONATE": {
        return "";
      }
      default:
        return state;
    }
  };

  export default redirectPostDonate;
  