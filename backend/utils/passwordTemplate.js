export const sendVerificationToken = (verificationCode) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Doğrula</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Email Doğrula</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Merhaba,</p>
    <p>Kaydolduğunuz için teşekkür ederiz! Doğrulama kodunuz:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">${verificationCode}</span>
    </div>
    <p>Kaydınızı tamamlamak için bu kodu doğrulama sayfasına girin.</p>
    <p>Güvenlik nedeniyle bu kod 15 dakika sonra geçerliliğini yitirecektir.</p>
    <p>Eğer sitemizde bir hesap oluşturmadıysanız lütfen bu e-postayı dikkate almayın.</p>
    <p>Saygılarımla,<br>Utku Toygun Bektasoglu</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Bu otomatik bir mesajdır, lütfen bu e-postaya cevap vermeyin.</p>
  </div>
</body>
</html>
`;
