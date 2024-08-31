import { Request, Response } from 'express';
import Appointment from '../models/Appointment.Model';
import { Op } from 'sequelize';


export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const { realtorId, clientId, date, propertyInQuestionId, propertyType,location } = req.body;

    const overlappingAppointments = await Appointment.findOne({
      where: {
        realtorId,
        clientId,
        date,
        location,
        propertyInQuestionId,
        propertyType,
      },
    });

    if (overlappingAppointments) {
      return res.status(400).json({ message: "Realtors have overlapping appointments." });
    }

    const appointment = await Appointment.create({
        realtorId,
        clientId,
        date,
        location,
        propertyInQuestionId,
        propertyType,
    });

    return res.status(201).json(appointment);
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ message: "Error booking appointment" });
  }
};



export const viewPastAppointmentsByRealtor = async (req: Request, res: Response) => {
    try {
      const { realtorId } = req.params;
  
      const pastAppointments = await Appointment.findAll({
        where: {
          realtorId: realtorId,
          date: {
            [Op.lt]: new Date(),
          },
        },
        order: [['date', 'DESC']],
      });
  
      return res.status(200).json(pastAppointments);
    } catch (error) {
      console.error("Error retrieving past appointments:", error);
      return res.status(500).json({ message: "Error retrieving past appointments" });
    }
  };


export const viewPastAppointmentsByClient = async (req: Request, res: Response) => {
    try {
      const { clientId } = req.params;
  
      const pastAppointments = await Appointment.findAll({
        where: {
          realtorId: clientId,
          date: {
            [Op.lt]: new Date(),
          },
        },
        order: [['date', 'DESC']],
      });
  
      return res.status(200).json(pastAppointments);
    } catch (error) {
      console.error("Error retrieving past appointments:", error);
      return res.status(500).json({ message: "Error retrieving past appointments" });
    }
  };


  export const viewFutureAppointmentsByRealtor = async (req: Request, res: Response) => {
    try {
      const { realtorId } = req.params;
  
      const pastAppointments = await Appointment.findAll({
        where: {
          realtorId: realtorId,
          date: {
            [Op.gt]: new Date(),
          },
        },
        order: [['date', 'DESC']],
      });
  
      return res.status(200).json(pastAppointments);
    } catch (error) {
      console.error("Error retrieving past appointments:", error);
      return res.status(500).json({ message: "Error retrieving past appointments" });
    }
  };


export const viewFutureAppointmentsByClient = async (req: Request, res: Response) => {
    try {
      const { clientId } = req.params;
  
      const pastAppointments = await Appointment.findAll({
        where: {
          realtorId: clientId,
          date: {
            [Op.gt]: new Date(),
          },
        },
        order: [['date', 'DESC']],
      });
  
      return res.status(200).json(pastAppointments);
    } catch (error) {
      console.error("Error retrieving past appointments:", error);
      return res.status(500).json({ message: "Error retrieving past appointments" });
    }
  };



export const viewAllFutureAppointments = async (req: Request, res: Response) => {
    try {
      const pastAppointments = await Appointment.findAll({
        where: {
        
          date: {
            [Op.gt]: new Date(),
          },
        },
        order: [['date', 'DESC']],
      });
  
      return res.status(200).json(pastAppointments);
    } catch (error) {
      console.error("Error retrieving past appointments:", error);
      return res.status(500).json({ message: "Error retrieving past appointments" });
    }
  };


export const viewAllPastAppointments = async (req: Request, res: Response) => {
    try {

      const pastAppointments = await Appointment.findAll({
        where: {
     
          date: {
            [Op.lt]: new Date(),
          },
        },
        order: [['date', 'DESC']],
      });
  
      return res.status(200).json(pastAppointments);
    } catch (error) {
      console.error("Error retrieving past appointments:", error);
      return res.status(500).json({ message: "Error retrieving past appointments" });
    }
  };

export const cancelAppointment = async (req: Request, res:Response) =>{
    try{
        const { appointmentId } = req.params;
        const appointment = await Appointment.findByPk(appointmentId);

        if(!appointment){
            return res.status(404).json({ message: "Appointment not found" });
        }

        if(new Date(appointment.date) < new Date()){
            return res.status(400).json({ message: "Cannot cancel an appointment in the past" });
        }

        await appointment.destroy();
        return res.status(204).send();
    }
    catch(error){
        console.error("Error canceling appointment:", error);
        return res.status(500).json({ message: "Error canceling appointment" });
    }
}

