import nodemailer from 'nodemailer'

export const registerMail = async (data) => {
  const { email, name, token } = data
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "256543cdc3377b",
      pass: "eb9be90222fbb6"
    }
  });

  const info = await transport.sendMail({
    from: 'Juniors Gym Administrador <admin@juniorsgym.com>',
    to: email,
    subject: "Juniors gym - Confirma tu cuenta",
    text: "Bienvenido a Admin Juniors Gym",
    html: `
      <p>Hola ${name}, comprueba tu cuenta en Junior's Gym</p>
      <p>Tu cuenta ya está lista, da click en el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Comprobar cuenta</a>
    `
  })
}

export const forgotPasswordMail = async (data) => {
  const { email, name, token } = data
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "256543cdc3377b",
      pass: "eb9be90222fbb6"
    }
  });

  const info = await transport.sendMail({
    from: 'Juniors Gym Administrador <admin@juniorsgym.com>',
    to: email,
    subject: "Juniors gym - Reestablece tu password",
    text: "Reestablece tu password",
    html: `
      <p>Hola ${name}, has solicitado restablecer tu password de Junior's Gym</p>
      <p>Sigue el siguiente enlace para generar un nuevo password:</p>
      <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reestablecer password</a>
    `
  })
}
