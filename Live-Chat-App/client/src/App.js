import './App.css';
import ChatBox from './components/ChatBox';
import UserRegister from './components/UserRegister';
import VendorRegister from './components/VendorRegister';
import VendorsListPanel from './components/VendorsListPanel';
import Temp from './Temp';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<UserRegister />} />
        <Route path="/vendor" element={<VendorRegister />} />
        <Route path="/temp" element={<Temp />} />
        <Route path="/waitinglist" element={<VendorsListPanel />} />
        <Route path="/chatbox" element={<ChatBox />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
