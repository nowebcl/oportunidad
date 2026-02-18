'use server';

import { Resend } from 'resend';

// Inicialización de Resend con la variable de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadData {
  industry: string;
  painPoint: string;
  timeline: string;
  budget: string;
  name: string;
  whatsapp: string;
}

export async function enviarLead(data: LeadData) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY no configurada');
    return { success: false, message: 'Configuration Error' };
  }

  try {
    const { industry, painPoint, timeline, budget, name, whatsapp } = data;

    // Envío del correo
    const result = await resend.emails.send({
      from: 'Oportunidad Digital <onboarding@resend.dev>', // Nombre actualizado de la web
      to: ['fratyr88@gmail.com'], // Dirección de destino solicitada
      subject: `🚀 Nuevo Lead: ${name} - ${industry}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; color: #1a202c;">
          <h1 style="color: #0891b2; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Nuevo Prospecto B2B</h1>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 140px;"><b>Nombre:</b></td>
              <td style="padding: 10px 0; color: #1e293b; font-size: 16px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px;"><b>WhatsApp:</b></td>
              <td style="padding: 10px 0; color: #1e293b; font-size: 16px;">
                <a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" style="color: #10b981; text-decoration: none;">${whatsapp}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px;"><b>Rubro:</b></td>
              <td style="padding: 10px 0; color: #1e293b; font-size: 16px;">${industry}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px;"><b>Urgencia:</b></td>
              <td style="padding: 10px 0; color: #1e293b; font-size: 16px;">${timeline}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 14px;"><b>Presupuesto:</b></td>
              <td style="padding: 10px 0; color: #1e293b; font-size: 16px;">${budget}</td>
            </tr>
          </table>

          <div style="margin-top: 30px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">Principal Problema / Necesidad</p>
            <p style="margin-top: 10px; color: #334155; line-height: 1.6; font-size: 15px;">${painPoint}</p>
          </div>

          <p style="margin-top: 30px; font-size: 12px; color: #cbd5e1; text-align: center;">Generado por Lander B2B Solutions AI</p>
        </div>
      `,
    });

    if (result.error) {
      console.error('Error de Resend:', result.error);
      return { success: false, message: 'Email service error' };
    }

    return { success: true, message: 'Sent successfully' };
  } catch (error) {
    console.error('Critical Action Error:', error);
    return { success: false, message: 'Server Internal Error' };
  }
}
