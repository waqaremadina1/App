import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import axios from 'axios'; // Import Axios for API requests

const { Title } = Typography;

export default function Edit() {
    const { user } = useAuthContext();
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [todo, setTodo] = useState({});

    const handleChange = (e) => {
        setTodo((s) => ({ ...s, [e.target.name]: e.target.value }));
    };

    const fetchDocument = async () => {
        setIsLoading(true);
        try {
            // Fetch documents from the backend (MongoDB)
            const response = await axios.get(`https://backend-hackathon-1.vercel.app/api/getEvent`);
            setDocuments(response.data.events);
        } catch (err) {
            console.error(err);
            window.toastify("Error fetching events.", "error");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDocument();
    }, []);

    const handleUpdate = async () => {
        let formData = { ...todo };
        formData.dateModified = new Date().toISOString(); // Using current timestamp
        formData.modifiedBy = {
            email: user.email,
            uid: user.uid
        };
        setIsLoading(true);
        try {
            // Send the updated event to the backend
            const response = await axios.put(`/api/events/${todo.id}`, formData);
            if (response.data.success) {
                let newDocuments = documents.map((doc) => {
                    if (doc.id === todo.id) return todo;
                    return doc;
                });
                setDocuments(newDocuments);
                window.toastify("Event has been successfully updated.", "success");
            } else {
                window.toastify("Something went wrong while updating the event.", "error");
            }
        } catch (err) {
            console.error(err);
            window.toastify("Something went wrong while updating the event.", "error");
        }
        setIsLoading(false);
    };

    const handleDelete = async (todo) => {
        setIsProcessing(true);
        try {
            // Send delete request to the backend
            const response = await axios.delete(`https://backend-hackathon-1.vercel.app/api/v2/updateEvent/${todo.id}`);
            if (response.data.success) {
                const newDocuments = documents.filter((doc) => doc.id !== todo.id);
                setDocuments(newDocuments);
                window.toastify("Event has been successfully deleted.", "success");
            } else {
                window.toastify("Something went wrong while deleting the event.", "error");
            }
        } catch (err) {
            console.error(err);
            window.toastify("Something went wrong while deleting the event.", "error");
        }
        setIsProcessing(false);
    };

    return (
        <>
            <Title level={1} className="text-center text-white py-3">
                My Events
            </Title>

            <main className="showTodos">
                <div className="card p-3 p-md-4 p-lg-5" style={{ borderRadius: '20px' }}>
                    {!isLoading ? (
                        <table className="table table-light table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((todo, i) => (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>{todo.title}</td>
                                        <td>{todo.location}</td>
                                        <td>{todo.date}</td>
                                        <td>
                                            <Button
                                                type="primary"
                                                size="medium"
                                                className="me-1 my-1"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editModal"
                                                onClick={() => {
                                                    setTodo(todo);
                                                }}
                                                loading={isLoading}
                                                style={{ fontWeight: 'bolder' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="primary"
                                                size="medium"
                                                danger
                                                className="btn-sm"
                                                onClick={() => {
                                                    handleDelete(todo);
                                                }}
                                                loading={isProcessing}
                                                style={{ fontWeight: 'bolder' }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center">
                            <div className="spinner-grow"></div>
                        </div>
                    )}
                </div>
            </main>

            <div className="modal fade" id="editModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ borderRadius: '20px' }}>
                        <div className="modal-header">
                            <h1 className="modal-title text-center fs-5">Update Event</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <Form layout="vertical">
                                <Row gutter={[16, 16]}>
                                    <Col span={[12]}>
                                        <Input
                                            style={{ borderRadius: '20px' }}
                                            size="large"
                                            type="text"
                                            placeholder="Enter Title"
                                            name="title"
                                            value={todo.title}
                                            onChange={handleChange}
                                        />
                                    </Col>

                                    <Col span={[12]}>
                                        <Input
                                            style={{ borderRadius: '20px' }}
                                            size="large"
                                            type="text"
                                            placeholder="Enter Location"
                                            name="location"
                                            value={todo.location}
                                            onChange={handleChange}
                                        />
                                    </Col>

                                    <Col span={[24]}>
                                        <Input
                                            style={{ borderRadius: '20px' }}
                                            size="large"
                                            type="date"
                                            placeholder="Enter Date"
                                            name="date"
                                            value={todo.date}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                style={{ fontWeight: 'bolder' }}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={handleUpdate}
                                style={{ fontWeight: 'bolder' }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
