
import Content from "./pages/Content";
import LandingPage from "./pages/Landing";
import { Route, Routes } from "react-router-dom";

function App() {
  
    return(
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/main-page" element={<Content/>} />
        </Routes>
      </div>
    )
  }

export default App;
