import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Nav from './components/Nav';
import Shop from './components/Shop';

function App() {
  return (
    <div className='App'>
      <Nav></Nav>
      <Shop></Shop>
    </div>
  );
}

export default App;
