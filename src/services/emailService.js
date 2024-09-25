import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORDEMAIL
    }
})

function requestHtml(subject, link) {
    let html;

    switch (subject) {
        case 'resetPassword':
            html = `
                <!DOCTYPE html>
                    <html lang="pt-BR">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Redefinir Senha</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 20px;
                            }
                            .container {
                                background-color: white;
                                padding: 20px;
                                border-radius: 5px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                max-width: 600px;
                                margin: auto;
                            }
                            h2 {
                                text-align: center;
                            }
                            p {
                                line-height: 1.5;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 15px;
                                margin: 20px 0;
                                background-color: #5cb85c;
                                color: white;
                                text-decoration: none;
                                border-radius: 4px;
                            }
                            .button:hover {
                                background-color: #4cae4c;
                            }
                        </style>
                    </head>
                    <body>

                    <div class="container">
                        <h2>Redefinição de Senha</h2>
                        <p>Olá,</p>
                        <p>Recebemos um pedido para redefinir sua senha. Para continuar, clique no botão abaixo:</p>
                        <a href=${link} class="button">Redefinir Senha</a>
                        <p>Se você não solicitou a redefinição de senha, pode ignorar este email.</p>
                        <p>Atenciosamente,<br>Equipe de Suporte</p>
                    </div>

                    </body>
                    </html>
            `
            break;
        default:

    }

    return html
}

export const sendResetPass = async (email, link) => {
    const html = requestHtml('resetPassword', link);
    console.log(html);
    const options = {
        from: process.env.EMAIL,
        to: email,
        subject: "Redefinição de senha",
        html: html
    }

    try{
        await transporter.sendMail(options)
    }catch(error){
        console.log(error.message)
        throw new Error("Não foi possível enviar o email de recuperação"+error.message);
    }
}