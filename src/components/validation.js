const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass, marginTopClass) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass,marginTopClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass,marginTopClass);
  }
}

const disableButton = (buttonElement, inactiveButtonClass, marginTopClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(marginTopClass);
}

const enableButton = (buttonElement, inactiveButtonClass ,marginTopClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(marginTopClass);
}

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.patternMismatch) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = ({ formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass,marginTopClass }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass,marginTopClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass,marginTopClass);
    });
  });
};

export const enableValidation = ({
  formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass,marginTopClass
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass,marginTopClass});
  });
};

export function clearValidation(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass,marginTopClass }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  });
  const buttonElement = formElement.querySelector(submitButtonSelector);
  disableButton(buttonElement, inactiveButtonClass,marginTopClass);
}



