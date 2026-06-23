import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(req: Request) {
  try {
    const { supplierName, riskScore } = await req.json();

    const myVerifiedEmail = "novaldarma@student.upi.edu";

    const params = {
      Source: myVerifiedEmail,
      Destination: {
        // Karena status Sandbox, kita kirim ke email kita sendiri sebagai simulasi
        ToAddresses: [myVerifiedEmail],
      },
      Message: {
        Subject: {
          Data: `[URGENT] Risk Warning: SupplyMind System Alert for ${supplierName}`,
        },
        Body: {
          Text: {
            Data: `Hello ${supplierName} Team,\n\nOur AI procurement system (SupplyMind) has detected a critical drop in your performance metrics. Your current Health Score is ${riskScore}/100.\n\nPlease review your pending shipments immediately to avoid operational disruptions and potential payment holds.\n\nRegards,\nSupplyMind Automated System`,
          },
        },
      },
    };

    const command = new SendEmailCommand(params);
    await sesClient.send(command);

    return Response.json({
      success: true,
      message: "Warning email sent successfully!",
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
