import { Routes, Route } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Contact from './components/contact/Contact';
import Courses from './components/courses/Courses';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import News from './components/news/News';
import Shows from './components/shows/Shows';
import Workshop from './components/workshop/Workshop';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="workshop" element={<Workshop />} />
        <Route path="shows" element={<Shows />} />
        <Route path="courses" element={<Courses />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
