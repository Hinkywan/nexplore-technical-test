// frontend/src/pages/Duties.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getDuties } from '../../services/dutyApi';

interface Duty {
    id: number;
    name: string;
    description: string;
}

const Duties: React.FC = () => {
    const [duties, setDuties] = useState<Duty[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDuties = async () => {
            const response = await getDuties();
            setDuties(response.data.data);
        };
        fetchDuties();
    }, []);

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
                <Button type="primary" onClick={() => navigate(`/duties/edit/${record.id}`)}>Edit</Button>
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