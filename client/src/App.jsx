import Main from "pages/Main";
import Settings from "pages/Settings";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <div className='app'>
      
      <Router>
        <Routes>
          {/* 기본 경로를 /day로 리디렉트 */}
          <Route path="/" element={<Navigate replace to="/day" />} />
          <Route path="/:viewType" element={<Main />} />
          <Route path="/:viewType/:year/:month/:day" element={<Main />} />
          <Route path="/settings" element={<Settings />}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
