import './App.css';
import {ShoppingWrapper} from './component/ShoppingWrapper';
import {Login} from './component/Login';
import {Register} from './component/Register';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {ShoppingIndex} from "./component/ShoppingّIndex";
import Logout from "./component/Logout";

function App() {
    const token = localStorage.getItem('jwtToken');
    return (
        <div className="w-full max-w-xs md:container md:mx-auto">
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/login" element={token ? <ShoppingWrapper/> : <Login/>}/>
                        <Route path="/Logout" element={token ? <Logout/> : <Navigate to="/login"/>}/>
                        <Route path="/register" element={token ? <ShoppingIndex/> : <Register/>}/>
                        <Route path="/dashboard" element={token ? <ShoppingWrapper/> : <Navigate to="/login"/>}/>
                        <Route path="/" element={<ShoppingIndex/>}/>
                    </Routes>
                </Router>
            </div>
        </div>
    );
}
export default App;
