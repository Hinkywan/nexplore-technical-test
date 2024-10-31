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
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item name="description" label="Description" rules={[{ message: 'Please input the description!' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item name="status" label="Status" initialValue="to-do" rules={[{ required: true, message: 'Please input the status!' }]}>
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