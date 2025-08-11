import classNames from 'classnames';
import React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
    label?: string;
    id?: string;
}

const Input: React.FC<InputProps> = ({ className, type, label, id, ...props }) => {
    const finalClasses = classNames(
        "w-full border p-2 rounded",
        className
    );

    return (
        <div className="flex flex-col">
            {label && <label className="mb-2 text-sm font-medium">{label}</label>}
            <input type={type} id={id} {...props} className={finalClasses} />
        </div>
    );
};

export { Input };
