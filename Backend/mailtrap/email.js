import { client, sender } from "./mailtrap.js";

export const sendVerificationCode = async (email, verificationCode) => {
    const recipients = [
        {
            email
        }
    ];

    try {
        await client.send({
            from: sender,
            to: recipients,
            template_uuid: "f0ecb9f3-99d3-4f40-84df-9e0d50979382",
            template_variables: {
                "company_info_name": "Authentication company",
                "zip_code": verificationCode
            }
        })


    } catch (error) {
        console.log(error)
    }
}

export const welcomeSingup = async (email, name) => {
    const recipients = [
        {
            email
        }
    ];

    try {
        client.send({
            from: sender,
            to: recipients,
            template_uuid: "7a2e5bb5-1f77-47eb-8bcb-5883a11f2462",
            template_variables: {
                "company_info_name": "Authentication Company",
                "name": name
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const successLogin = async (email, name) => {
    const recipient = [
        { email }
    ]

    try {
        await client.send({
            from: sender,
            to: recipient,
            template_uuid: "d9393ad2-b984-4113-b80a-24f12dc4a389",
            template_variables: {
                "company_info_name": "Authentication company",
                "name": name
            }
        })
    } catch (error) {
        console.log(error)
    }
}


export const forgetpassword = async (email, url) => {
    const recipients = [
        { email }
    ]
    try {
        await client.send({
            from: sender,
            to: recipients,
            html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                <header style="background-color: brown; color: white; font-size: large; font-weight: bold; font-family: Arial, Helvetica, sans-serif; text-align: center;">Reset your password</header>
                <div style="height: 3rem; width: 6rem; background-color: blue; color: white; font-weight: bold; font-family: Arial, Helvetica, sans-serif; display: flex; justify-content: center; align-items: center; text-align: center;">
                    <a style="text-decoration: none;" href=${url}>Reset Password</a>
                </div>
                <footer style="text-align: center;">
                    Reset your password click above button.
                </footer>
                </body>
                </html>`,
            subject: "reset password",
            category: "reset password",
        })
    } catch (error) {

    }
}

export const resetsuccess = async (email) => {
    const recipients = [{ email }]
    try {
        client
        .send({
          from: sender,
          to: recipients,
          template_uuid: "5c99ac9b-04a0-418a-81f3-2490b030b200",
          template_variables: {
            "company_info_name": "Test_Company_info_name",
            "name": "Test_Name"
          }
          })
            } catch (error) {
                console.log(error)
            }
    }