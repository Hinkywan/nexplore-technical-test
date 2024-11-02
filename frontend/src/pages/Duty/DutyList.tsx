// frontend/src/pages/Duties.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getDuties, deleteDuty } from '../../services/dutyApi';
import { GlobalErrorContext } from '../../contexts/GlobalErrorContext';

interface Duty {
    id: number;
    name: string;
    description: string;
}

const Duties: React.FC = () => {
    const [duties, setDuties] = useState<Duty[]>([]);
    const navigate = useNavigate();
    const { setError } = useContext(GlobalErrorContext);

    useEffect(() => {
        const fetchDuties = async () => {
            try {
                const response = await getDuties();
                setDuties(response.data?.data);
            } catch (error) {
                console.error('Failed to fetch duties:', error);
                setError('Failed to fetch duties');
            }
        };
        fetchDuties();
    }, [setError]);

    const handleDelete = async (id: number) => {
        try {
            const response = await deleteDuty(id);
            if (response.status === 204) {
                setDuties(duties.filter(duty => duty.id !== id));
            } else {
                console.error('Failed to delete duty:', response.statusText);
                setError('Failed to delete duty');
            }
        } catch (error) {
            console.error('Failed to delete duty:', error);
            setError('Failed to delete duty');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Duty) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button type="primary" onClick={() => navigate(`/duties/edit/${record.id}`)}>Edit</Button>
                    <Button type="default" danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={() => navigate('/duties/create')} style={{ marginBottom: 16 }}>
                Create Duty
            </Button>
            <Table dataSource={duties} columns={columns} />
        </div>
    );
};

export default Duties;