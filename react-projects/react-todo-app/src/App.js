import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Nav from './components/Nav';
import Footer from './components/Footer';
import NoteState from './store/noteState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App' >
      <NoteState>
        <Nav />
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/about' Component={About}></Route>
          <Route path='/contact' Component={Contact}></Route>
          <Route path='/services' Component={Services}></Route>
        </Routes>
        <Footer></Footer>
        {/* Toastify  */}
      </NoteState>
      <ToastContainer />
    </div>
  );
}

export default App;
