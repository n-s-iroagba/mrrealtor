// src/RealtorList.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import RealtorAccordion from '../components/RealtorAccordion';


const RealtorList: React.FC = () => {
    const realtors = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '+1234567890',
          state: 'California',
          localGovernmentArea: 'Los Angeles',
          district: 'Central'
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phoneNumber: '+0987654321',
          state: 'New York',
          localGovernmentArea: 'Brooklyn',
          district: 'North'
        },
        {
          id: 3,
          firstName: 'Emily',
          lastName: 'Johnson',
          email: 'emily.johnson@example.com',
          phoneNumber: '+1122334455',
          state: 'Texas',
          localGovernmentArea: 'Houston',
          district: 'East'
        },
        {
          id: 4,
          firstName: 'Michael',
          lastName: 'Brown',
          email: 'michael.brown@example.com',
          phoneNumber: '+1222333444',
          state: 'Florida',
          localGovernmentArea: 'Miami',
          district: 'South'
        },
        {
          id: 5,
          firstName: 'Sarah',
          lastName: 'Davis',
          email: 'sarah.davis@example.com',
          phoneNumber: '+1444555666',
          state: 'Illinois',
          localGovernmentArea: 'Chicago',
          district: 'West'
        }
      ];
      

  const handleChat = (id: number) => {
    console.log(`Chat with realtor ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete realtor ${id}`);
  };

  const handleBan = (id: number) => {
    console.log(`Ban realtor ${id}`);
  };

  const handleViewListings = (id: number) => {
    console.log(`View listings for realtor ${id}`);
  };

  const handleViewLikes = (id: number) => {
    console.log(`View likes for realtor ${id}`);
  };

  const handleViewFutureAppointments = (id: number) => {
    console.log(`View future appointments for realtor ${id}`);
  };

  const handleViewPastAppointments = (id: number) => {
    console.log(`View past appointments for realtor ${id}`);
  };

  return (
    <Container className="mt-5">
      <h1>Realtor List</h1>
      <RealtorAccordion
        realtors={realtors}
        onChat={handleChat}
        onDelete={handleDelete}
        onBan={handleBan}
        onViewListings={handleViewListings}
        onViewLikes={handleViewLikes}
        onViewFutureAppointments={handleViewFutureAppointments}
        onViewPastAppointments={handleViewPastAppointments}
      />
    </Container>
  );
};

export default RealtorList;
