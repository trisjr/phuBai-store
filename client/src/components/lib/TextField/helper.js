function checkEmail(value) {
  if (!value) {
    return true;
  }
  let regexEmail;
  regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!value.match(regexEmail);
}

function checkTextField(roles, value) {
  let role = roles.split("|");
  if (role.includes("email") && !checkEmail(value)) {
    return false;
  }
  return !(role.includes("required") && !value);
}

export default checkTextField;
