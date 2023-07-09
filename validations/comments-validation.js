const joi = require("joi");

const commentsValidation = joi.object({
  commentContent: joi.string().not("").required().messages({
    "base.string": "댓글을 확인해주세요.",
    "any.not": "댓글을 확인해주세요.",
    "any.invalid": "댓글을 확인해주세요.",
    "any.required": "댓글을 확인해주세요.",
  }),
});

module.exports = { commentsValidation };
