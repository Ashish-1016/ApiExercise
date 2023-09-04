import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCart from './pages/UserCart.tsx';
import { UserProvider } from './contexts/UserContext';
import Main from "./pages/Main.tsx";

function App() {
    const userId = '1'
    return (
        <BrowserRouter>
            <UserProvider userId={userId}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/user-cart" element={<UserCart />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;