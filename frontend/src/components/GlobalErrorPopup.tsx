// frontend/src/components/GlobalErrorPopup.tsx
import React, { useContext } from 'react';
import { Modal } from 'antd';
import { GlobalErrorContext } from '../contexts/GlobalErrorContext';

const GlobalErrorPopup: React.FC = () => {
    const { error, setError } = useContext(GlobalErrorContext);

    return (
        <Modal
            title="Error"
            open={error !== null}
            onOk={() => setError(null)}
            onCancel={() => setError(null)}
        >
            <p>{error}</p>
        </Modal>
    );
};

export default GlobalErrorPopup;