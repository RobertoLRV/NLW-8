import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';


export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6c3c69434b26fe",
    pass: "299ff6573da1d4"
  }
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })
  
  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Roberto Luiz <luizroberto1957@hotmail.com>',
    subject: 'Novo Feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo de feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n')
  })

  return res.status(201).json({data: feedback});
})