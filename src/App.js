import './App.css';
import NavBar from './component/NavBar';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from './component/Home';
import About from './component/About';
import { MyNotes } from './component/MyNotes';
import NoteState from './context/NoteState';
import { Login } from './component/Login';
import { SignUp } from './component/SignUp';


function App() {
  return (
    <NoteState>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </NoteState>
  );
}

export default App;
