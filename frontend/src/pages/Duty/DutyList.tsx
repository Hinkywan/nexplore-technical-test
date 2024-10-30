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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Duty) => (
                <Button type="primary" onClick={() => navigate(`/duties/edit/${record.id}`)}>Edit</Button>
            ),
        },
    ];

    return <Table dataSource={duties} columns={columns} />;
};

export default Duties;