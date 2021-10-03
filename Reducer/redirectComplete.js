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
      case "COMPLETE_LOINHAN": {
        return "LOINHAN";
      }
      case "COMPLETE_LOINHAN_TCD": {
        return "LOINHAN_TCD";
      }
      case "COMPLETE_LOINHAN_CXD": {
        return "LOINHAN_CXD";
      }
      case "COMPLETE_LOINHAN_CANCEL": {
        return "LOINHAN_CANCEL";
      }
      default:
        return state;
    }
  };
  
  export default redirectComplete;
  