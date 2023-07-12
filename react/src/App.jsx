import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './views/Home';
import Movies from './views/Movies';
import Movie from './views/Movie';
import BuyTicket from './views/BuyTicket';
import MyTicket from './views/MyTicket';
import MyBalance from './views/MyBalance';
import Login from './views/Login';
import Register from './views/Register';
import NotFound from './views/NotFound';
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/buyticket" element={<BuyTicket />} />
        <Route path="/myticket" element={<MyTicket />} />
        <Route path="/mybalance" element={<MyBalance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
