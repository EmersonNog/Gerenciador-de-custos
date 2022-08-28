import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Components/Pages/Home';
import Projects from './Components/Pages/Projects';
import Company from './Components/Pages/Company';
import NewProject from './Components/Pages/NewProject';
import Project from './Components/Pages/Project';

import Container from './Components/Layouts/Container';
import Navbar from './Components/Layouts/Navbar';
import Footer from './Components/Layouts/Footer';

function App() {
  return (
    <Router>

    <Navbar/>

    <Container customClass="min_height">
      <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/company' element={<Company/>}/>
          <Route path='/newproject' element={<NewProject/>}/>
          <Route path='/project/:id' element={<Project/>}/>
      </Routes>
    </Container>

    <Footer/>
    
    </Router>
  );
}

export default App;
