import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Welcome from './components/welcome';
import Login from './components/login';
function App() {
  return (
   <Router>
     <Routes>
       <Route path="/" element={<Welcome />}></Route>
       <Route path="/login" element={<Login/>}></Route>
       {/* <Route path="signup" element={}></Route> */}
     </Routes>
   </Router>
  );
}

export default App;
