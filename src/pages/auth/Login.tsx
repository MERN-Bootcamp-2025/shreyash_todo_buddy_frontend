import React, { useState } from 'react'
import { Input } from '../../components/ui/input/Input';
import { Button } from '../../components/ui/button/Button'
import axiosInstance from '../../services/axiosInstance/axios'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slice/authSlice';


const Login: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/login', formData);
            console.log('response.data',response.data)
            dispatch(setCredentials({accessToken : response.data.accessToken , userId : response.data.userId , userRole : response.data.role}))
            toast.success("Login successful!");
        } catch (err) {
            toast.error("Error while logging in!");
            console.error(err);
        }
    }


    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }


    return (
        <div className='relative min-h-screen flex items-center justify-center'>
            <form className='w-full max-w-md p-8 bg-white shadow-md rounded-lg' onSubmit={handelSubmit}>
                <div className='flex flex-col mb-4'>
                    <label htmlFor="TaskMaster" className='font-semibold text-2xl text-center'>TaskMaster</label>
                    <label htmlFor="welcomeBack" className='font-bold text-2xl text-center mt-3'>Welcome Back</label>
                </div>
                <Input type="email" name="email" placeholder='Enter your Email' label='Email' className='py-5 mb-4' value={formData.email} onChange={handelChange} />
                <Input type="password" name="password" placeholder='Enter your Password' label='Password' className='py-5 mb-4' value={formData.password} onChange={handelChange} />
                <Button className='rounded mt-4 w-full py-2 font-bold hover:bg-green-300' primary>Login</Button>
                <a href="" className='text-center block mt-4'>Forgot Password?</a>
            </form>
        </div>
    )
}

export default Login;
