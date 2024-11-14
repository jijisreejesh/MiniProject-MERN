import "./App.css";
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Index from "./Components/Index";
import Login from "./Components/Login";
import {AuthProvider} from './Components/AuthContext'
import Home from "./Components/Home";
import Portfolio1 from "./Components/Portfolio1";
import Builder from "./Components/Builder";
import Portfolio2 from "./Components/Portfolio2";
import ImageBuilder from "./Components/ImageBuilder";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
      <Routes>
      <Route path="/" element={<Index/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home/:id" element={<Home/>}></Route>
        <Route path="/portfolio1/:id" element={<Portfolio1/>}></Route>
        <Route path="/portfolio2/:id" element={<Portfolio2/>}></Route>
        <Route path="/build/:id/:Id" element={<Builder/>}/>
        <Route path="/imageBuild/:userId/:templateId" element={<ImageBuilder/>}/>
      </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
