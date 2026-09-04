import { Table, Container, Badge, Card, Row, Col, Button } from "react-bootstrap";
import UserModal from "../components/UserModal";
import { useEffect, useState } from "react";
import AppModal from "../components/AppModal";
import api from "../services/api";
import UserForm from "../components/UserForm";

const User = () => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const initialForm = {
    id: null,
    name: "",
    email: "",
    password: "",
    status: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("user");
      const result = await response.data;
      console.log("hasil fetch ", result);
      setUsers(result);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  // fetchUsers();
  const handleCreate = () => {
    setIsEdit(false);
    setFormData(initialForm);
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);

    try {
      const payload = { ...formData };
      const response = await api.post("/user", payload);

      setShow(false);
      fetchUsers();
    } catch (error) {
      console.log("error " + error);

      if (error.response.status === 422 && error.response.data.errors) {
        const rawErrors = error.response.data.errors;
        const formatError = {};

        Object.keys(rawErrors).forEach((key) => {
          formatError[key] = rawErrors[key][0];
        });

        setValidationError(formatError);
      } else {
        const errMsg = error.response?.data?.message || "Internal Server Error";
      }
    }
  };

  return (
    <>
      <Container className="py-4">
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Row className="mb-4 align-items-center">
              <Col>
                <h3>User Management</h3>
                <p className="text-muted mb-0">Data User Management</p>
              </Col>
              <Col xs="auto">
                <Button variant="primary" onClick={handleCreate}>
                  + Create New User
                </Button>
              </Col>
            </Row>
            <Table responsive hover bordered className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>
                      <Button variant="outline-warning" size="sm" className="me-2">
                        Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" className="me-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <AppModal
          show={show}
          handleClose={handleCloseModal}
          title={isEdit ? "Edit User" : "Create New User"}
          submitText={isEdit ? "Save Change" : "Save"}
          variant={isEdit ? "Warning" : "Primary"}
          isLoading={submitLoading}
          formId="user-form"
        >
          <UserForm errors={validationError} formId="user-form" formData={formData} setFormData={setFormData} onSubmit={handleSubmit}></UserForm>
        </AppModal>
      </Container>
    </>
  );
};

export default User;
