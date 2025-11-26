import Home from "./pages/Home";
import Layout from "./components/Layout";
import Learn from './pages/Learn';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import PageNotFound from "./pages/PageNotFound";
import Register from "./components/Register";
import Teach from './pages/Teach';
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCourses from "./pages/AdminCourses";

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Layout> 
          <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/learn'} element={<Learn/>}/>
            <Route path="/learn/register" element={<Register />} />
            <Route path={'/teach'} element={<Teach/>}/>
            <Route path={'/contact'} element={<Contact/>}/>
            <Route path="/admin/login" element={<AdminLogin 
            // onLogin={() => window.location.href = "/admin/dashboard"} 
            />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route path={'*'} element={<PageNotFound/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
