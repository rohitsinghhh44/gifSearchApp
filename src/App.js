
import './App.css';
import Home from './component/HomePage/Home';
import {Routes , Route} from "react-router-dom"
import Second from './component/HomePage/Second';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/second' element={<Second/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
