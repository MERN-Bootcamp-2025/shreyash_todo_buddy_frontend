import React, { useEffect, useState } from 'react';
import NavBar from '../../components/ui/navbar/NavBar';
import SearchBar from '../../components/ui/search/SearchBar';
import TaskCard from '../../components/TaskCard';
import axiosInstance from '../../services/axiosInstance/axios';
import { Button } from '../../components/ui/button/Button';
import Add_UpdateTask from '../../components/Add_UpdateTask';

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

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        try {
            const response = await axiosInstance.get('/todos');
            setTodos(response.data.result.todos);
        } catch (error) {
            console.error('Failed to fetch todos:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axiosInstance.delete(`/todos/${id}`);
            console.log('Task deleted successfully', response.data);
            getTodos();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task: Todo) => {
        console.log("Editing task", task);
        setTaskToEdit(task);
        setIsModalOpen(true);
    };


    return (
        <div className="bg-gray-50 min-h-screen">
            <NavBar />
            <div className="max-w-7xl mx-auto p-4">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">My Tasks</h1>
                    <Button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => setIsModalOpen(true)}
                    >
                        + New Task
                    </Button>
                </div>

                <div className="m-4 flex flex-col gap-4">
                    <SearchBar
                        className="border px-3 py-3 rounded w-full"
                        placeholder="Search tasks by name..."
                    />

                    <div className="flex flex-col md:flex-row gap-4">
                        <select className="border px-3 py-3 rounded w-full md:w-[600px]">
                            <option value="">Filter by Status</option>
                            <option value="todo">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                            <option value="on hold">On Hold</option>
                            <option value="will not do">Will Not Do</option>
                        </select>

                        <select className="border px-3 py-3 rounded w-full md:w-[600px]">
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
                                onDelete={() => handleDelete(todo.id)}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-10">No tasks found.</p>
                    )}
                </div>
            </div>

            <Add_UpdateTask
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                getTodos={getTodos}
                taskToEdit={taskToEdit}
            />
        </div>
    );
};

export default MyTasks;
