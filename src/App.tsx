import { Routes, Route, } from 'react-router-dom';
import MyTasks from './pages/Home/MyTasks';
import Login from './pages/auth/Login';
import InviteUser from './pages/InviteUser/inviteUser';
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <div>
      <ToastContainer position='top-right' autoClose={2000} theme='light' />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mytasks" element={<MyTasks />} />
        <Route path="/invite" element={<InviteUser />} />
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
