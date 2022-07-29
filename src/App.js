import './App.css';
import NavBar from './component/NavBar';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from './component/Home';
import About from './component/About';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
