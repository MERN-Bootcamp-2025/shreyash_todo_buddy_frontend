import React from 'react';
import { Button } from './ui/button/Button';
import { FiEdit, FiTrash2 } from 'react-icons/fi';


interface TaskCardProps {
    id: string;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    onEdit?: (task: any) => void;
    onDelete?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    id,
    title,
    description,
    status,
    priority,
    onEdit,
    onDelete,
}) => {
    const handleDelete = async () => {
        if (onDelete) onDelete();
    };

    const handleEdit = () => {
        if (onEdit) onEdit({ id, title, description, status, priority });
    };

    return (
        <div className="bg-white p-4 shadow rounded flex justify-between items-start">
            <div>
                <h2
                    className={`text-lg font-semibold ${status === 'Done' ? 'line-through text-gray-400' : ''}`}
                >
                    {title}
                </h2>
                <p className={`text-gray-600 ${status === 'Done' ? 'line-through' : ''}`}>
                    {description}
                </p>

                <div className="mt-2 flex gap-2 text-sm">
                    <p>
                        {status}
                    </p>
                    <p>
                        {priority}
                    </p>
                </div>
            </div>

            <div className="flex gap-2 mt-1">
                <Button onClick={handleEdit} className='border-none'>
                    <FiEdit size={20} />
                </Button>
                <Button onClick={handleDelete} className='border-none'>
                    <FiTrash2 size={20} />
                </Button>
            </div>
        </div>
    );
};

export default TaskCard;

