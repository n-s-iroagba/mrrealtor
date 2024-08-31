import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BuildingList: React.FC = () => {
  const [realtors, setRealtors] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate()


  useEffect(() => {
    axios.get('/api/realtors-with-buildings')
      .then((response) => {
        setRealtors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to retrieve buildings');
        setLoading(false);
      });
  }, []);

  const handleBuildingClick = (buildingId: number) => {
    navigate(`/buildings/${buildingId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      {realtors.map((realtor:any) => (
        <Row key={realtor.id} className="mb-4">
          <Col>
            <Card>
              <Card.Header>
                <h5>{realtor.name}</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  {realtor.buildings.map((building:any) => (
                    <ListGroup.Item
                      key={building.id}
                      action
                      onClick={() => handleBuildingClick(building.id)}
                    >
                      <div>
                        <h6>{building.name}</h6>
                        <p>Location: {building.location}</p>
                        <p>Price: ${building.price}</p>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default BuildingList;
