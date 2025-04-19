
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router";
import Register from "../src/pages/Register"
import Login from "../src/pages/Login"
import Home  from "../src/pages/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;