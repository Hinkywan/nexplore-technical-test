// frontend/src/pages/EditDuty.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDutyById, updateDuty } from '../../services/dutyApi';
import DutyForm from '../../components/DutyForm';
import { Duty } from '../../types/Duty';


const EditDuty: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [duty, setDuty] = useState<Duty | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDuty = async () => {
            const response = await getDutyById(Number(id));
            setDuty(response.data.data);
        };
        fetchDuty();
    }, [id]);

    const onFinish = async (values: Duty) => {
        await updateDuty(Number(id), values);
        navigate('/duties');
    };

    if (!duty) {
        return <div>Loading...</div>;
    }

    return <DutyForm initialValues={duty} onFinish={onFinish} />;
};

export default EditDuty;