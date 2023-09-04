import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import UserCart from './pages/UserCart.tsx';
import { UserProvider } from './contexts/UserContext';

function App() {


    const userId = '1'
    //const cartId = '19'

    return (
        <BrowserRouter>
            <UserProvider userId={userId}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/user-cart" element={<UserCart />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;