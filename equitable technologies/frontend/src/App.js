import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home.jsx"
import React , {useState} from 'react';
import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';

export const App = () => {
  const [currform, setcurrform] = useState('login');
  const toggleForm = (formName) => {
    setcurrform(formName);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact path="/"
            element={currform === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
          />
          <Route
            exact path="/home"
            element={<Home />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
