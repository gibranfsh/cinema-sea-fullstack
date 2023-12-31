import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Home from './views/Home';
import Movies from './views/Movies';
import Movie from './views/Movie';
import BuyTicket from './views/BuyTicket';
import MyTicket from './views/MyTicket';
import MyBalance from './views/MyBalance';
import Payment from './views/Payment';
import Login from './views/Login';
import Register from './views/Register';
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { ContextProvider } from './contexts/ContextProvider'

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/buyticket" element={<BuyTicket />} />
          <Route path="/myticket" element={<MyTicket />} />
          <Route path="/mybalance" element={<MyBalance />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ContextProvider>
  )
}

export default App
