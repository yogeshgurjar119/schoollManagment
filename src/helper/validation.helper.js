

const isEmailValid = (email) => {
    const regexEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+.)+[A-Z]{2,4}$/i;
    const emailValidation = regexEmail.test(email);
    // console.log(emailValidation)
    return emailValidation;
  };
  
  const isValidphonenumber = (contact) => {
    const regExContact = /^[6-9]\d{9}$/;
    const validatecontact = regExContact.test(contact);
    return validatecontact;
  };




module.exports = {
    isEmailValid,
    isValidphonenumber
  }