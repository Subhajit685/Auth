import { MailtrapClient } from "mailtrap"

const TOKEN = "8272e398390b050f3ba8ac372f50d5b0";
const HOST = "https://send.api.mailtrap.io/"

export const client = new MailtrapClient({
    endpoint: HOST,
    token: TOKEN,
});

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Mailtrap Test",
};

