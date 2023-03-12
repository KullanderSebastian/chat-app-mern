import "./style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";

function App() {
    return (
        <div className="App">
            <LoginForm />
        </div>
    )
}

export default App;
