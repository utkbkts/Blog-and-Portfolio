import { getContactHtmlTemplate } from "../utils/contactTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import ErrorHandler from "../utils/handlerError.js";
import { catchAsyncError } from "catchasyncerror";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const contactSend = catchAsyncError(async (req, res, next) => {
  const { email, message, subject, token } = req.body;

  if (!email || !message || !subject || !token) {
    return next(new ErrorHandler("All Fields Required", 400));
  }

  const messageHtml = getContactHtmlTemplate(email, message);

  try {
    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const googleVerifyResponse = await axios.post(googleVerifyUrl, null, {
      params: {
        secret: process.env.SECRET_GOOGLE_KEY,
        response: token,
      },
    });

    const { success } = googleVerifyResponse.data;

    if (!success) {
      return res
        .status(400)
        .json({ error: "Invalid reCAPTCHA, please try again." });
    }

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
    console.error("Error:", error);
    return next(
      new ErrorHandler("An error occurred while processing your request.", 500)
    );
  }
});

export default {
  contactSend,
};
