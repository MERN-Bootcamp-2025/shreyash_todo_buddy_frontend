import React, { useState } from 'react';
import { Button } from '../../components/ui/button/Button';
import axiosInstance from '../../services/axiosInstance/axios';
import { toast } from 'react-toastify';
import { Input } from '../../components/ui/input/Input';
import { useNavigate } from 'react-router-dom';

interface User {
    email: string;
    name: string;
    role: string;
    user_id: string;
}

const InviteUser: React.FC = () => {

    const [formData, setFormData] = useState<User>({
        email: '',
        name: '',
        role: 'user',
        user_id: '',
    });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGoBack = () => {
        navigate('/mytasks')
    }

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

            const response = await axiosInstance.post('/invite', requestData);

            if (response.status === 200) {
                // toast.success('User invited successfully!');
            } else {
                // toast.error('Failed to invite user!');
            }
            navigate('/mytasks')
        } catch (error) {
            console.error('Error inviting user:', error);
            toast.error('Error while inviting user!');
        }
    };

    return (
        <div className=" relative min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Invite User</h2>
                <div>
                    <Input
                        type="email"
                        label='Email'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                        required />
                </div>

                <div>
                    <Input
                        type="text"
                        name="name"
                        label='Name'
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                        required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>


                <div className="flex justify-center mt-4 gap-2">
                    <Button type="submit" className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 cursor-pointer" onClick={handleGoBack}>
                        Go Back
                    </Button>
                    <Button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 cursor-pointer">
                        Invite User
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default InviteUser;
