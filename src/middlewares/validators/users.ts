import { body, ValidationChain } from 'express-validator';

function createEmailBaseChain(): ValidationChain {
  return body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()

    .isEmail()
    .withMessage('Email is invalid')
    .bail()

    .isLength({ max: 255 })
    .withMessage('Email cannot be longer than 255 characters')
    .bail();
}

function createPasswordBaseChain(): ValidationChain {
  return body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()

    .isLength({ max: 64 })
    .withMessage('Password cannot be longer than 64 characters')
    .bail();
}

function createRegisterChain(): ValidationChain[] {
  return [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .bail()

      .isLength({ max: 100 })
      .withMessage('Name cannot be longer than 100 characters')
      .bail()

      .escape(),

    createEmailBaseChain()
      .normalizeEmail()
      .escape(),

    createPasswordBaseChain()
      .isStrongPassword({
        minLength: 12,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1
      })
      .withMessage('Password must be at least 12 characters long and include'
        + ' at least one uppercase letter, one lowercase letter, one number,'
        + ' and one symbol')
      .bail()

    .escape(),
  ];
}

function createLoginChain(): ValidationChain[] {
  return [
    createEmailBaseChain().normalizeEmail(),
    createPasswordBaseChain(),
  ];
}

export default {
  createRegisterChain,
  createLoginChain,
};
