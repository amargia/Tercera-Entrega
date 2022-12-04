import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'nigel.prosacco61@ethereal.email',
        pass: 'RWv36SvVwzF9y1yQvq'
    }
});

//función para enviar correos
const sendMail = async (data) => {
    const mailOptions = {
        from: 'nigel.prosacco61@ethereal.email',
        to: 'nigel.prosacco61@ethereal.email',
        subject: 'Nuevo registro',
        html: `<h1 style="color: blue;">Se ha registrado un nuevo usuario con username: ${data.username} y mail: ${data.email}</h1>`
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log(error);
    }
}

//función para enviar correos por nueva compra
const sendMailPurchase = async (data) => {
    const usuario = data.username;
    const mail = data.email;
    const productos = data.products;
    const arrayProductos = productos.map(el => el.name);

    const mailContent = {
        from: 'nigel.prosacco61@ethereal.email',
        to: 'nigel.prosacco61@ethereal.email',
        subject: 'Nueva compra',
        html: `<h1 style="color: blue;">Se ha realizado una nueva compra por parte de ${usuario} con mail: ${mail}</h1>
        <h2>Los productos comprados son: ${arrayProductos}</h2>`
    }
    try {
        const info = await transporter.sendMail(mailContent);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log(error);
    }
}

export { sendMail, sendMailPurchase };