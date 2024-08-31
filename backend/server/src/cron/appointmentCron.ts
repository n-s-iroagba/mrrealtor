
import { Op } from 'sequelize';
import Appointment from '../models/Appointment.Model';

export const sendReminders = async () => {
  const upcomingAppointments = await Appointment.findAll({
    where: {
      date: {
        [Op.between]: [new Date(), new Date(new Date().getTime() + 24 * 60 * 60 * 1000)],
      },
    },
  });

  for (const appointment of upcomingAppointments) {
    // Trigger the reminder (you would implement this)
    // sendReminder(appointment.realtor1Id, appointment.realtor2Id, appointment);
  }
};

// Schedule the job to run every hour

