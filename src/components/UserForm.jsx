import { Form } from "react-bootstrap";

const UserForm = ({ formId, formData, setFormData, onSubmit, errors = {} }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Form id={formId} onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Name</Form.Label>
          <Form.Control isInvalid={!!errors.name} type="text" name="name" placeholder="Enter Your Name" className="fw-semibold" value={formData.name} onChange={handleChange}></Form.Control>
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Email</Form.Label>
          <Form.Control isInvalid={!!errors.email} isInvalid={!!errors.name} type="email" name="email" placeholder="Enter Your Email" className="fw-semibold" value={formData.email} onChange={handleChange}></Form.Control>
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <Form.Control isInvalid={!!errors.password} type="password" name="password" placeholder="Enter Your Password" className="fw-semibold" value={formData.password} onChange={handleChange}></Form.Control>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Status</Form.Label>
          <Form.Select name="status" value={formData.status} onChange={handleChange}>
            <option value="" hidden>
              --Choose Yours--
            </option>
            <option value="1">Active</option>
            <option value="0">In-Active</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </>
  );
};

export default UserForm;
