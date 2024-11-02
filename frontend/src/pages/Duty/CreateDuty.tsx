// frontend/src/pages/CreateDuty.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createDuty } from '../../services/dutyApi';
import DutyForm from '../../components/DutyForm';

const CreateDuty: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            await createDuty(values);
            navigate('/duties');
        } catch (error) {
            console.error('Failed to create duty:', error);
        }
    };

    return <DutyForm initialValues={{ name: '', title: '', description: '', status: 'to-do' }} onFinish={onFinish} />;
};

export default CreateDuty;