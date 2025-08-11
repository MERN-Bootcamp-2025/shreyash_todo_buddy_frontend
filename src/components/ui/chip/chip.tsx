import classNames from 'classnames';
import React from 'react';

interface ChipProps {
    label: string;
    type: 'status' | 'priority';
    onClick: (value: string) => void;
}

const Chip: React.FC<ChipProps> = ({ label, type, onClick }) => {
    const statusColors: { [key: string]: string } = {
        'on hold': 'bg-yellow-100 text-yellow-700',
        'todo': 'bg-gray-100 text-gray-700',
        'in progress': 'bg-blue-100 text-blue-700',
        'done': 'bg-green-100 text-green-700',
        'will not do': 'bg-gray-200 text-gray-700'
    };

    const priorityColors: { [key: string]: string } = {
        low: 'bg-green-100 text-green-700',
        medium: 'bg-yellow-100 text-yellow-700',
        high: 'bg-red-100 text-red-700',
        critical: 'bg-red-200 text-red-800'
    };
    const chipClass = type === 'status' ? statusColors[label] : priorityColors[label];

    const finalClasses = classNames('inline-flex items-center px-2 py-1 rounded-full', chipClass)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        onClick(value);
    };

    return (
        <span
            className={finalClasses}
        >
            {type === 'status' && (
                <select
                    value={label}
                    onChange={handleChange}
                    className="w-full bg-transparent text-black"
                >
                    <option value="on hold">On Hold</option>
                    <option value="todo">To Do</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="will not do">Will Not Do</option>
                </select>
            )}
            {type === 'priority' && (
                <select
                    value={label}
                    onChange={handleChange}
                    className="w-full bg-transparent text-black"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>
            )}


        </span>
    );
};

export default Chip;
