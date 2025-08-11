import React from 'react';
import { Button } from '../button/Button';
import classNames from 'classnames';

interface ModalProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onOpenChange, title, children, className }) => {
    if (!isOpen) return null;

    const handleClose = () => {
        onOpenChange(false);
    };

    const finalClassnames = classNames(
        "bg-white p-6 rounded-lg shadow-lg w-full max-w-md",
        className
    );

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-60 backdrop-blur-sm flex justify-center items-center px-4 max-w-80: mask-auto"
            onClick={handleClose}>
            <div
                className={finalClassnames}
                onClick={(e) => e.stopPropagation()}>
                <div className="relative mb-4 text-center">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <Button
                        onClick={handleClose}
                        className="absolute right-0 top-0 text-gray-500 hover:text-red-500 border-none">
                        X
                    </Button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Modal;
