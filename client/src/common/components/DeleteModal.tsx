import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { deleteListing } from '../helpers/apiHelpers';
import '../styles/common.styles.css'

const DeleteModal:React.FC<{id:number,show:boolean,address:string}>= ({ id, address,show }) => {
const [error, setError] = useState('');
const [showModal, setShowModal]= useState(false);
const [confirmatoryAddress, setConfirmatoryAddress]= useState('');
const [submitting,setSubmitting] = useState(false)

 

  useEffect(() => {
    setShowModal(show);
  }, [show])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmatoryAddress(e.target.value);
  };
  
  const handleClose = ()=>{
    setShowModal(false);
    window.location.reload()
  }

    const handleConfirm = async () => {
      if (confirmatoryAddress === address) {
        setSubmitting(true);
        try {
          await deleteListing(id)
        } catch (error) {
          console.error('Deletion error:', error);
          setError(`An error occurred while deleting the listing with address: ${address}`);
        }finally{
          setSubmitting(false);
        }
      } else {
        setError('Incorrect secretCode');
      }
    };
    
  


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="adminPassword">
          <Form.Label>Enter the property address: <strong>{address}</strong></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={confirmatoryAddress}
            onChange={handleChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Back
        </Button>
        <Button  disabled={submitting}variant="primary" onClick={handleConfirm}>
          {submitting?<Spinner size='sm'/>:'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

