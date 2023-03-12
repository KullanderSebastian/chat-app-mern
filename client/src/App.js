import "./style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
    return (
        <div className="App">
            <RegisterForm />
        </div>
    )
}

export default App;
