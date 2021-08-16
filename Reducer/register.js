
var newuser = (
  state = { username: "", phonenumber: "", password: "", verificationId :""},
  action
) => {
  switch (action.type) {
    case "REGISTER_OTP":
      return {
        ...state,
        username: action.username,
        phonenumber: action.phonenumber,
        password: action.password,
        verificationId: action.verificationId,
      };
    default:
      return state;
  }
};

export default newuser;
