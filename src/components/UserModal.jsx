import { Modal, Form, Button, ModalHeader } from "react-bootstrap";

const UserModal = ({ show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Management User</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter Your Name" className="fw-semibold"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter Your Email" className="fw-semibold"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter Your Password" className="fw-semibold"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Status</Form.Label>
              <Form.Select name="status">
                <option value="" hidden>
                  --Choose Yours--
                </option>
                <option value="1">Active</option>
                <option value="0">In-Active</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;
