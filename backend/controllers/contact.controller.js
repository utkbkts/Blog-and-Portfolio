import { getContactHtmlTemplate } from "../utils/contactTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import ErrorHandler from "../utils/handlerError.js";
import { catchAsyncError } from "catchasyncerror";

const contactSend = catchAsyncError(async (req, res, next) => {
  const { email, message, subject } = req.body;

  const messageHtml = getContactHtmlTemplate(email, message);

  try {
    await sendEmail({
      email,
      subject,
      message: messageHtml,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${email}`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export default {
  contactSend,
};
