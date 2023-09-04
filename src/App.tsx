import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCart from './pages/UserCart.tsx';
import { UserProvider } from './contexts/UserContext';
import HomeMain from "./pages/HomeMain.tsx";

function App() {
    const userId = '1'
    return (
        <BrowserRouter>
            <UserProvider userId={userId}>
                <Routes>
                    <Route path="/" element={<HomeMain />} />
                    <Route path="/user-cart" element={<UserCart />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;