import './App.css';
import { Route , Routes } from "react-router-dom";
import Home from './pages/Home';
import AddUser from './pages/Users/AddUser';
import EditUser from './pages/Users/EditUser';
import AddCar from './pages/Cars/AddCar';
import EditCar from './pages/Cars/EditCar';



function App() {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/addUser" element = {<AddUser />} />
        <Route path = "/editUser/:studentId" element = {<EditUser />} />
        <Route path = "/addCar" element = {<AddCar />} />
        <Route path = "/editCar/:id" element = {<EditCar />} />
      </Routes>

    </div>
  );
}

export default App;
