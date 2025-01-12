import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

async function createAssessment({
  projectID = "my-website-1736668136059",
  recaptchaKey = process.env.PUBLIC_GOOGLE_KEY,
  token,
  recaptchaAction = "www.utkubektasoglu.com",
}) {
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  const [response] = await client.createAssessment(request);

  if (!response.tokenProperties.valid) {
    console.log(
      `The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`
    );
    return null;
  }

  if (response.tokenProperties.action === recaptchaAction) {
    console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);

    response.riskAnalysis.reasons.forEach((reason) => {
      console.log(`Reason: ${reason}`);
    });

    return response.riskAnalysis.score;
  } else {
    console.log(
      "The action attribute in your reCAPTCHA tag does not match the action you are expecting to score"
    );
    return null;
  }
}
export default createAssessment;
