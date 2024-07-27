// src/App.tsx or any other parent component
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import LikedByModal from '../component/LikedByModal';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const LikedByList: React.FC = () => {
const [modalShow, setModalShow] = useState(true);

  const likedBy = [
    { firstName: 'John', lastName: 'Doe' },
    { firstName: 'Jane', lastName: 'Smith' },
    { firstName: 'Alice', lastName: 'Johnson' },
    { firstName: 'Bob', lastName: 'Brown' }
  ];

  return (
    <Container className="mt-5 text-center">
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Show Realtors Who Liked
      </Button>

      <LikedByModal show={modalShow} onHide={() => setModalShow(false)} likedBy={likedBy} />
    </Container>
  );
};

export default LikedByList;
