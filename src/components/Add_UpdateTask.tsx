import React, { useState, useEffect } from 'react';
import Modal from './ui/modal/Modal';
import { Input } from './ui/input/Input';
import { Button } from './ui/button/Button';
import axiosInstance from '../services/axiosInstance/axios';
import { toast } from 'react-toastify';
interface Todo {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
}
interface AddUpdateTaskProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    getTodos: () => void;
    taskToEdit?: Todo | null;
}

const Add_UpdateTask: React.FC<AddUpdateTaskProps> = ({ isOpen, onOpenChange, getTodos, taskToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
    });

    const [modalTitle, setModelTitle] = useState<string>('');

    useEffect(() => {
        if (taskToEdit) {
            setModelTitle("Update Task")
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description,
                status: taskToEdit.status,
                priority: taskToEdit.priority,
            });
        } else {
            setModelTitle("Add New Task");
            setFormData({
                title: '',
                description: '',
                status: '',
                priority: '',
            });
        }
    }, [taskToEdit]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const userId = localStorage.getItem('userId');
            if (!userId) {
                toast.error('User ID not found!');
                return;
            }

            const requestData = {
                ...formData,
                user_id: userId.toString(),
            };

            const response = taskToEdit ? await axiosInstance.put(`/todos/${taskToEdit.id}`, requestData) : await axiosInstance.post('/todos', requestData);

            // if (response) {
            //     toast.success(taskToEdit ? 'Task updated successfully!' : 'Task added successfully!');
            // }
            getTodos();
            onOpenChange(false);

        } catch (error) {
            toast.error('Error while adding task!');
            console.error('Error while adding task:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} title={modalTitle}>
            <form onSubmit={handleSubmit} className="space-y-6 px-4">
                <Input
                    name="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title" />
                <Input
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    className="py-2" />

                <div className="flex gap-6">
                    <div className="flex-1 min-w-[140px]">
                        <label className="block mb-1 font-medium">Priority</label>
                        <select
                            name="priority"
                            className="w-full border p-2 rounded"
                            value={formData.priority}
                            onChange={handleChange}>
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>

                    <div className="flex-1 min-w-[140px]">
                        <label className="block mb-1 font-medium">Status</label>
                        <select
                            name="status"
                            className="w-full border p-2 rounded"
                            value={formData.status}
                            onChange={handleChange}>
                            <option value="">Select Status</option>
                            <option value="todo">To Do</option>
                            <option value="in progress">In Progress</option>
                            <option value="on hold">On Hold</option>
                            <option value="done">Done</option>
                            <option value="will not do">Will Not Do</option>
                        </select>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Submit Task
                </Button>
            </form>
        </Modal>
    );
};

export default Add_UpdateTask;
