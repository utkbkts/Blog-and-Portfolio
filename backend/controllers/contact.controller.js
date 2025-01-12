import { getContactHtmlTemplate } from "../utils/contactTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import ErrorHandler from "../utils/handlerError.js";
import { catchAsyncError } from "catchasyncerror";
import createAssessment from "../utils/googleRep.js";

const contactSend = catchAsyncError(async (req, res, next) => {
  const { email, message, subject, token } = req.body;

  if (!email || !message || !subject || !token) {
    return next(new ErrorHandler("All Fields Required", 400));
  }

  if (token) {
    await createAssessment(token);
  }

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
