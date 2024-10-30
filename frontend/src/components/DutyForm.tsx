// frontend/src/components/DutyForm.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { Duty } from '../types/Duty';

interface DutyFormProps {
    initialValues: Duty;
    onFinish: (values: Duty) => Promise<void>;
}

const DutyForm: React.FC<DutyFormProps> = ({ initialValues, onFinish }) => {
    return (
        <Form initialValues={initialValues} onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DutyForm;