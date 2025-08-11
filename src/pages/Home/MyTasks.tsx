import React, { useEffect, useState } from 'react';
import NavBar from '../../components/ui/navbar/NavBar';
import SearchBar from '../../components/ui/search/SearchBar';
import TaskCard from '../../components/TaskCard';
import axiosInstance from '../../services/axiosInstance/axios';
import { Button } from '../../components/ui/button/Button';
import Add_UpdateTask from '../../components/Add_UpdateTask';
import DeleteModel from '../../components/DeleteModel';
import { useNavigate } from 'react-router-dom';

interface Todo {
    id: string;
    title: string;
    description: string;
    status: 'To Do';
    priority: 'Low';
}

const MyTasks: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Todo | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Todo | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const navigate = useNavigate();
    const [status, setStatus] = useState<string | null>('')
    const [priority, setPriority] = useState<string | null>('')
    const [title, setTitle] = useState<string | null>('')
    const [page, setPage] = useState(1);
    const [limit] = useState(3);
    const [totalPages, setTotalPages] = useState(1);



    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        setUserRole(storedRole);
        getTodos();
    }, [status, priority, title, page]);

    const getTodos = async () => {
        try {
            const response = await axiosInstance.get('/todos', { params: { status, priority, title, page, limit, } });
            setTodos(response.data.todos);

            if (response.data.totalCount !== undefined) {
                setTotalPages(Math.ceil(response.data.totalCount / limit));
            } else {
                setTotalPages(response.data.todos.length < limit ? page : page + 1);
            }
        } catch (error) {
            console.error('Failed to fetch todos:', error);
        }
    };

    const handelStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
        setPage(1);
    };

    const handelPriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value);
        setPage(1);
    };


    const handleDelete = async (id: string) => {
        if (taskToDelete) {
            try {
                const response = await axiosInstance.delete(`/todos/${id}`);
                console.log('Task deleted successfully', response.data);
                getTodos();
                setIsDeleteModalOpen(false);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }

    };

    const handleEdit = (task: Todo) => {
        console.log("Editing task", task);
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const openDeleteConfirmation = (task: Todo) => {
        setTaskToDelete(task);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteConfirmation = () => {
        setIsDeleteModalOpen(false);
    };

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        setUserRole(storedRole);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        setUserRole(null);
        navigate('/');
    };

    const onSearch = (text: string) => {
        console.log('text', text);
        setTitle(text);
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <NavBar role={userRole} onLogout={handleLogout} />
            <div className="max-w-7xl mx-auto p-4">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">My Tasks</h1>
                    <Button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-po"
                        onClick={() => { setTaskToEdit(null); setIsModalOpen(true) }}
                    >
                        + New Task
                    </Button>
                </div>

                <div className="m-4 flex flex-col gap-4">
                    <SearchBar
                        className="border px-3 py-3 rounded w-full"
                        placeholder="Search tasks by name..."
                        onSearch={onSearch}
                    />

                    <div className="flex flex-col md:flex-row gap-4">
                        <select className="border px-3 py-3 rounded w-full md:w-[600px]" onChange={handelStatus}>
                            <option value="">Filter by Status</option>
                            <option value="todo">To Do</option>
                            <option value="in progress">In Progress</option>
                            <option value="done">Done</option>
                            <option value="on hold">On Hold</option>
                            <option value="will not do">Will Not Do</option>
                        </select>

                        <select className="border px-3 py-3 rounded w-full md:w-[600px]" onChange={handelPriority}>
                            <option value="">Filter by Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4 mt-3 mb-3">
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <TaskCard
                                key={todo.id}
                                id={todo.id}
                                title={todo.title}
                                description={todo.description}
                                status={todo.status}
                                priority={todo.priority}
                                onEdit={() => handleEdit(todo)}
                                onDelete={() => openDeleteConfirmation(todo)}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-10">No tasks found.</p>
                    )}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <Button
                                className='rounded-full border-none w-[100px] bg-gray-300 hover:bg-gray-500'
                                disabled={page === 1}
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                Previous
                            </Button>
                            <span>Page {page} of {totalPages}</span>
                            <Button
                                className='rounded-full border-none w-[100px] bg-gray-300 hover:bg-gray-500'
                                disabled={page === totalPages}
                                onClick={() => setPage((prev) => prev + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Add_UpdateTask
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                getTodos={getTodos}
                taskToEdit={taskToEdit}
            />

            <DeleteModel
                isOpen={isDeleteModalOpen}
                onOpenChange={closeDeleteConfirmation}
                onConfirm={() => handleDelete(taskToDelete!.id)}
            />
        </div>
    );
};

export default MyTasks;
