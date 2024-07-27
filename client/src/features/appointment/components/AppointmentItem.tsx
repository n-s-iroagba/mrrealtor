
// src/components/AppointmentItem.tsx
// src/components/AppointmentItem.tsx
import React from 'react';
import { Card } from 'react-bootstrap';


interface AppointmentItemProps {
  appointment: {
    id: number;
    date: string;
    location: string;
    realtor: {
      firstName: string;
      lastName: string;
    };
    client: {
      firstName: string;
      lastName: string;
    };
    propertyInQuestion: {
      district: string;
    };
    propertyType: 'property' | 'land';
  };
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment }) => {
  return (
    <Card className="mb-3"> {/* Added text-center class */}
      <Card.Body>
        <Card.Title>Appointment ID: {appointment.id}</Card.Title>
        <Card.Text>
          <div className='d-flex mb-2'>
            <div className='w-50'><strong>Date:</strong></div> 
            {new Date(appointment.date).toLocaleString()} 
          </div>
          <div className='d-flex mb-2'>
            <div className='w-50'><strong>Location:</strong></div>
            {appointment.location}
          </div>
          <div className='d-flex mb-2'>
            <div className='w-50'><strong>Realtor:</strong></div>
            {appointment.realtor.firstName} {appointment.realtor.lastName}
          </div>
          <div className='d-flex mb-2'>
            <div className='w-50'><strong>Client:</strong></div>
            {appointment.client.firstName} {appointment.client.lastName}
          </div>
          <div className='d-flex mb-2'>
            <div className='w-50'><strong>Property District:</strong></div>
            {appointment.propertyInQuestion.district}
          </div>
          <div className='d-flex mb-2'>
            <div className='w-50'><strong>Property Type:</strong></div>
            {appointment.propertyType}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AppointmentItem;

