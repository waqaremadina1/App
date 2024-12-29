import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useAuthContext } from '../../../context/AuthContext';
import axios from 'axios'; // Import axios for API calls

const { Title } = Typography;

const initialState = {
    title: "",
    location: "",
    date: "" // Replacing description with date
};

export default function Add() {
    const { user } = useAuthContext();
    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setState((s) => ({ ...s, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let { title, location, date } = state; // Using date instead of description
        title = title.trim();
        location = location.trim();
        date = date.trim();

        if (title.length < 3) {
            return window.toastify("Title must be at least 3 characters.", "error");
        }
        if (location.length < 5) {
            return window.toastify("Please enter your location correctly.", "error");
        }
        if (!date) {
            return window.toastify("Please enter a valid date.", "error");
        }

        let formData = { title, location, date };
        formData.dateCreated = new Date().toISOString(); // Using current timestamp
        formData.createdBy = {
            email: user.email,
            uid: user.uid
        };

        await createDocument(formData);
    };

    const createDocument = async (formData) => {
        setIsLoading(true);
        try {
            // Sending the event data to the backend to save it in MongoDB
            const response = await axios.post('https://backend-hackathon-1.vercel.app/api/v2/events', formData);
            if (response.data.success) {
                window.toastify("Event has been successfully added.", "success");
            } else {
                window.toastify("Something went wrong while adding the event.", "error");
            }
        } catch (err) {
            console.error(err);
            window.toastify("Something went wrong while adding the event.", "error");
        }
        setIsLoading(false);
        setState(initialState);
    };

    return (
        <main className="addTodo">
            <div className="card p-3 p-md-4 mx-sm-4" style={{ borderRadius: '20px' }}>
                <Title level={2} className="text-center">
                    Add Event
                </Title>
                <Form layout="vertical">
                    <Row gutter={[16, 16]}>
                        <Col span={[24]}>
                            <Input
                                style={{ borderRadius: '20px' }}
                                size="large"
                                type="text"
                                placeholder="Enter Title"
                                name="title"
                                value={state.title}
                                onChange={handleChange}
                            />
                        </Col>

                        <Col span={[24]}>
                            <Input
                                style={{ borderRadius: '20px' }}
                                size="large"
                                type="text"
                                placeholder="Enter Location"
                                name="location"
                                value={state.location}
                                onChange={handleChange}
                            />
                        </Col>

                        <Col span={[24]}>
                            <Input
                                style={{ borderRadius: '20px' }}
                                size="large"
                                type="date" // Updated to a date input
                                placeholder="Enter Date"
                                name="date"
                                value={state.date}
                                onChange={handleChange}
                            />
                        </Col>

                        <Button
                            style={{ borderRadius: '20px', fontWeight: 'bolder' }}
                            type="primary"
                            size="large"
                            loading={isLoading}
                            onClick={handleSubmit}
                            className="w-100 my-2"
                        >
                            Add Event
                        </Button>
                    </Row>
                </Form>
            </div>
        </main>
    );
}