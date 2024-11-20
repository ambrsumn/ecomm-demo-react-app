import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProductBoughtModal = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Product Bought</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Congratulations! You have successfully purchased this product.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductBoughtModal;