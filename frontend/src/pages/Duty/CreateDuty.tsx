// frontend/src/pages/CreateDuty.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDuty } from '../../services/dutyApi';
import DutyForm from '../../components/DutyForm';
import { GlobalErrorContext } from '../../contexts/GlobalErrorContext';

const CreateDuty: React.FC = () => {
    const navigate = useNavigate();
    const { setError } = useContext(GlobalErrorContext);

    const onFinish = async (values: any) => {
        try {
            await createDuty(values);
            navigate('/duties');
        } catch (error) {
            console.error('Failed to create duty:', error);
            setError('Failed to create duty');
        }
    };

    return <DutyForm initialValues={{ name: '', title: '', description: '', status: 'to-do' }} onFinish={onFinish} />;
};

export default CreateDuty;