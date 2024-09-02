// src/components/AppointmentList.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
import AppointmentItem from '../components/AppointmentItem';

// interface Appointment {
//   id: number;
//   date: string;
//   location: string;
//   realtor: {
//     firstName: string;
//     lastName: string;
//   };
//   client: {
//     firstName: string;
//     lastName: string;
//   };
//   propertyInQuestion: {
//     district: string;
//   };
//   propertyType: 'property' | 'land';
// }

const AppointmentList: React.FC = () => {

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
   // const [appointments, setAppointments] = useState<Appointment[]>([]);
  //   const fetchAppointments = async () => {
  //     try {
  //       const response = await axios.get<Appointment[]>('/api/appointments'); // Adjust API endpoint as necessary
  //       setAppointments(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError('Failed to fetch appointments.');
  //       setLoading(false);
  //     }
  //   };

  //   fetchAppointments();
  // }, []);
  // src/mockData.ts
const appointments = [
  {
    id: 1,
    date: '2024-08-01T10:00:00Z',
    location: '123 Main St',
    realtor: {
      firstName: 'John',
      lastName: 'Doe',
    },
    client: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    propertyInQuestion: {
      district: 'Downtown',
    },
    propertyType: 'property'as 'property',
  },
  {
    id: 2,
    date: '2024-08-02T14:00:00Z',
    location: '456 Elm St',
    realtor: {
      firstName: 'Alice',
      lastName: 'Johnson',
    },
    client: {
      firstName: 'Bob',
      lastName: 'Brown',
    },
    propertyInQuestion: {
      district: 'Suburbia',
    },
    propertyType: 'land' as 'land',
  },
  {
    id: 3,
    date: '2024-08-03T09:00:00Z',
    location: '789 Oak St',
    realtor: {
      firstName: 'Michael',
      lastName: 'Williams',
    },
    client: {
      firstName: 'Emma',
      lastName: 'Davis',
    },
    propertyInQuestion: {
      district: 'Uptown',
    },
    propertyType: 'property' as 'property',
  },
  // Add more mock appointments as needed
];


  // if (loading) {
  //   return (
  //     <Container className="text-center mt-5">
  //       <Spinner animation="border" />
  //     </Container>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Container className="text-center mt-5">
  //       <Alert variant="danger">{error}</Alert>
  //     </Container>
  //   );
  // }

  return (
    <Container className="mt-5">
      <Row>
        {appointments.map((appointment) => (
          <Col md={6} lg={4} key={appointment.id}>
            <AppointmentItem appointment={appointment} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AppointmentList;
