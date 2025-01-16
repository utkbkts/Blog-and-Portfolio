export default (user, statusCode, res) => {
  const token = user.getJwtToken();

  const setCookies = () => {
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
    });
  };

  setCookies();

  res.status(statusCode).json({
    user,
  });
};
