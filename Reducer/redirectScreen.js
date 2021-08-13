var controlThreadTCD = (state = "tangcongdong", action) => {
  switch (action.type) {
    case "setThreadTCD": {
      return "tangcongdong";
    }
    case "setThreadGiveGroup": {
      return "tangquy";
    }
    default:
      return state;
  }
};

export default controlThreadTCD;
