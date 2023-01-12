import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Error, Login } from "./pages";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
