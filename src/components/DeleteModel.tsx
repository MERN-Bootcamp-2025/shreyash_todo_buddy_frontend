import React from 'react';
import { Button } from './ui/button/Button';
import Modal from './ui/modal/Modal';

interface DeleteModelProps {
    isOpen: boolean;
    onOpenChange: () => void;
    onConfirm: () => void;
}

const DeleteModel: React.FC<DeleteModelProps> = ({
    isOpen,
    onOpenChange,
    onConfirm,
}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} title="Confirm Deletion">
            <p className="text-gray-600">
                Are you sure you want to delete the task? This action is permanent and cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-4">
                <Button
                    onClick={onOpenChange}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 border-gray-200"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => onConfirm()}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteModel;
