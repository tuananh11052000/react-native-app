var controlThreadGiveFor = (state = "canhan", action) => {
    switch (action.type) {
      case "giveForCaNhan": {
        return "canhan";
      }
      case "giveForQuy": {
        return "quy";
      }
      case "giveForCongIch": {
        return "tochuc";
      }
      default:
        return state;
    }
  };
  
  export default controlThreadGiveFor;
  