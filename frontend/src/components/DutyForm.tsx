// frontend/src/components/DutyForm.tsx
import React from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { Duty } from '../types/Duty';

interface DutyFormProps {
    initialValues: Duty;
    onFinish: (values: Duty) => Promise<void>;
}

const DutyForm: React.FC<DutyFormProps> = ({ initialValues, onFinish }) => {
    return (
        <Form initialValues={initialValues} onFinish={onFinish} layout="vertical">
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            { required: true, message: 'Please input the name!' },
                            { max: 100, message: 'Name cannot be longer than 100 characters' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            { required: true, message: 'Please input the title!' },
                            { max: 100, message: 'Title cannot be longer than 100 characters' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { max: 500, message: 'Description cannot be longer than 500 characters' }
                        ]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="status"
                        label="Status"
                        initialValue="to-do"
                        rules={[
                            { required: true, message: 'Please select the status!' }
                        ]}
                    >
                        <Select>
                            <Select.Option value="to-do">To Do</Select.Option>
                            <Select.Option value="in-progress">In Progress</Select.Option>
                            <Select.Option value="done">Done</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default DutyForm;