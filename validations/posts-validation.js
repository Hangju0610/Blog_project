const joi = require("joi");

const postValidation = joi.object({
  postTitle: joi.string().not("").required().messages({
    "any.invalid": "게시글 제목을 확인해주세요.",
    "string.base": "게시글 제목을 확인해주세요.",
    "any.required": "게시글 제목을 확인해주세요.",
  }),
  postContent: joi.string().not("").required().messages({
    "any.invalid": "게시글 내용을 확인해주세요.",
    "string.base": "게시글 내용을 확인해주세요.",
    "any.required": "게시글 내용을 확인해주세요.",
  }),
});

module.exports = {
  postValidation,
};
