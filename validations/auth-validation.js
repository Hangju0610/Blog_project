const joi = require("joi");

const signupValidation = joi.object({
  nickname: joi.string().not("").min(3).alphanum().required().messages({
    "any.only": "닉네임의 형식이 일치하지 않습니다.",
  }),
  password: joi.string().not("").required().messages({
    "any.only": "비밀번호를 확인해주세요.",
  }),
  confirmPassword: joi.equal(joi.ref("password")).not("").required().messages({
    "any.only": "비밀번호를 확인해주세요.",
  }),
});

const loginValidation = joi.object({
  nickname: joi.string().not("").required().messages({
    "any.invalid": "닉네임을 확인해주세요.",
  }),
  password: joi.string().not("").required().messages({
    "any.invalid": "비밀번호를 확인해주세요.",
  }),
});

module.exports = {
  signupValidation,
  loginValidation,
};
