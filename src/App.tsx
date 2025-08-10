import {Routes, Route } from 'react-router-dom';
import MyTasks from './pages/Home/MyTasks';
import Login from './pages/auth/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/mytasks" element={<MyTasks />} />
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
