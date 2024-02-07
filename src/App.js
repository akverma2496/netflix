import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <>
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>}/>
          <Route path='/details' element={<MovieDetail />} />
        </Routes>
      </AuthContextProvider>
    </div>
    </>  
  );
}

export default App;
