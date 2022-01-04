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
        <Route exact path="/" component={Home} />
        <Route path="workshop" component={Workshop} />
        <Route path="shows" component={Shows} />
        <Route path="courses" component={Courses} />
        <Route path="news" component={News} />
        <Route path="contact" component={Contact} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
