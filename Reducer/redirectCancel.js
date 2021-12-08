var redirectCancel = (state = "", action) => {
    switch (action.type) {
      case "SET_GUI_HOME": {
        return "gui_home";
      }
      case "DEFAULT": {
        return "";
      }
      default:
        return state;
    }
  };

  export default redirectCancel;
  