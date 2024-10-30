// frontend/src/pages/CreateDuty.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createDuty } from '../../services/dutyApi';
import DutyForm from '../../components/DutyForm';

const CreateDuty: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        await createDuty(values);
        navigate('/duties');
    };

    return <DutyForm initialValues={{ name: '', description: '' }} onFinish={onFinish} />;
};

export default CreateDuty;