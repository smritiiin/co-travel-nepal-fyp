import { Client, SendEmailV3_1, LibraryResponse } from "node-mailjet";

const mailjet = new Client({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

(async () => {
  const data: SendEmailV3_1.Body = {
    Messages: [
      {
        From: {
          Email: "pilot@test.com",
        },
        To: [
          {
            Email: "passenger@test.com",
          },
        ],
        TemplateErrorReporting: {
          Email: "reporter@test.com",
          Name: "Reporter",
        },
        Subject: "Your email flight plan!",
        HTMLPart:
          "<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
        TextPart:
          "Dear passenger, welcome to Mailjet! May the delivery force be with you!",
      },
    ],
  };

  const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
    .post("send", { version: "v3.1" })
    .request(data);

  const { Status } = result.body.Messages[0];
})();
