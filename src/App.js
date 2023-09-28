import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";

function App() {
  return (
   <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
   </>
  );
}

export default App;
