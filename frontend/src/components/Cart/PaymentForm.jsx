import React, { useEffect, useRef, useState } from 'react';
import classes from './PaymentForm.module.css';

// Error messages for invalid card information
const ERROR_MESSAGE_INVALID_CARD_NUMBER =
  'Card Number needs to be between 13 and 16 digits.';
const ERROR_MESSAGE_INVALID_CARD_NAME =
  'Carholder Name needs to be FIRST NAME and LAST NAME with space.';
const ERROR_MESSAGE_INVALID_CARD_EXPIRATION =
  'Expiration needs to be MM/YY with valid month and year.';
const ERROR_MESSAGE_INVALID_CARD_CVC = 'CVC needs to be 3 or 4 digits.';

const PaymentForm = (props) => {
  // state variables for form inputs
  const [cardNumber, setCardNumber] = useState('');
  const [errorMessageCardNumber, setErrorMessageCardNumber] = useState(null);
  const [cardName, setCardName] = useState('');
  const [errorMessageCardName, setErrorMessageCardName] = useState(null);
  const [expiration, setExpiration] = useState('');
  const [errorMessageCardExpiration, setErrorMessageCardExpiration] =
    useState(null);
  const [cvc, setCvc] = useState('');
  const [errorMessageCardCvc, setErrorMessageCardCvc] = useState(null);
  const ref = useRef();

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onConfirm({
      cardNumber: cardNumber,
      cardName: cardName,
      expiration: expiration,
      cvc: cvc,
    });
  };

  // validate input values
  const validateInput = (str, regExp) => {
    if (regExp.test(str)) return true;
    else return false;
  };

  const validateCardNumberInput = (e) => {
    const cardNumber = e.target.value;
    // validate if card number length is valid
    if (cardNumber.length < 13 || cardNumber.length > 16) {
      setErrorMessageCardNumber(ERROR_MESSAGE_INVALID_CARD_NUMBER);
    } else {
      setErrorMessageCardNumber(null);
    }
  };

  const handleCardNumberInput = (e) => {
    // validate if input is only digits or empty string
    if (validateInput(e.target.value, new RegExp(/^[0-9]{0,16}$/)))
      setCardNumber(e.target.value);
  };

  const validateNameInput = (e) => {
    // validate if the string has space between first name and last name
    if (
      !validateInput(
        e.target.value,
        new RegExp(/^([a-zA-Z]{1,}\s[a-zA-Z']{1,})/i)
      )
    ) {
      setErrorMessageCardName(ERROR_MESSAGE_INVALID_CARD_NAME);
    } else {
      setErrorMessageCardName(null);
    }
  };

  const handleCardExpirationInput = (e) => {
    if (
      // validate if input is only 2 digits in both the begging and the end
      validateInput(e.target.value, new RegExp(/\b\d{1,2}\b|^(?!.)/))
    )
      setExpiration(e.target.value);
  };

  const validateCardExpirationInput = (e) => {
    const val = e.target.value;
    // validate if input is formatted as MM/YY
    if (!validateInput(val, new RegExp(/\d{2}\/\d{2}/))) {
      setErrorMessageCardExpiration(ERROR_MESSAGE_INVALID_CARD_EXPIRATION);
    } else {
      // extra validation of valid month and year
      const [month, year] = val.split('/');
      const today = new Date();
      if (
        Number(year) < Number(today.getFullYear().toString().substring(2)) ||
        (Number(year) === Number(today.getFullYear().toString().substring(2)) &&
          Number(month) < Number(today.getMonth().toString()) + 1) ||
        Number(month) > 12
      ) {
        setErrorMessageCardExpiration(ERROR_MESSAGE_INVALID_CARD_EXPIRATION);
      } else {
        setErrorMessageCardExpiration(null);
      }
    }
  };

  const handleCardCvcInput = (e) => {
    // validate if input is only 3 or 4 digits or empty string
    if (validateInput(e.target.value, new RegExp(/\b\d{1,4}\b|^(?!.)/)))
      setCvc(e.target.value);
  };

  const validateCardCvcInput = (e) => {
    const cvc = e.target.value;
    if (cvc.length < 3 || cvc.length > 4) {
      setErrorMessageCardCvc(ERROR_MESSAGE_INVALID_CARD_CVC);
    } else {
      setErrorMessageCardCvc(null);
    }
  };

  // auto scroll to the payment form for better UX
  useEffect(() => {
    ref.current.scrollIntoView();
  }, []);

  return (
    <form ref={ref} onSubmit={handleSubmit} className={classes.form}>
      <h2>Payment details</h2>
      {/* validate each input field */}
      <div className={classes.control}>
        <label htmlFor="card-number">Card Number</label>
        <input
          type="text"
          id="card-number"
          value={cardNumber}
          onChange={handleCardNumberInput}
          onBlur={validateCardNumberInput}
          maxLength="16"
          placeholder="XXXX XXXX XXXX XXXX"
          pattern="\d{13,16}"
          autoFocus
          title={ERROR_MESSAGE_INVALID_CARD_NUMBER}
          required
        />
        {errorMessageCardNumber && (
          <p className={classes.error}>{errorMessageCardNumber}</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="card-holder">Cardholder Name</label>
        <input
          type="text"
          id="card-holder"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          onBlur={validateNameInput}
          placeholder="FIRST LAST"
          pattern="^([a-zA-Z]{1,}\s[a-zA-Z']{1,})"
          title={ERROR_MESSAGE_INVALID_CARD_NAME}
          required
        />
        {errorMessageCardName && (
          <p className={classes.error}>{errorMessageCardName}</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="card-expiration">Expiration</label>
        <input
          type="text"
          id="card-expiration"
          value={expiration}
          onChange={handleCardExpirationInput}
          onBlur={validateCardExpirationInput}
          maxLength="5"
          placeholder="MM/YY"
          pattern="\d{2}/\d{2}"
          title={ERROR_MESSAGE_INVALID_CARD_EXPIRATION}
          required
        />
        {errorMessageCardExpiration && (
          <p className={classes.error}>{errorMessageCardExpiration}</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="card-cvc">CVC</label>
        <input
          type="text"
          id="card-cvc"
          value={cvc}
          onChange={handleCardCvcInput}
          onBlur={validateCardCvcInput}
          required
          maxLength="4"
          placeholder="CVC"
          pattern="\d{3,4}"
          title={ERROR_MESSAGE_INVALID_CARD_CVC}
        />
        {errorMessageCardCvc && (
          <p className={classes.error}>{errorMessageCardCvc}</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
