import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Message from '../Layouts/Message';
import Container from '../Layouts/Container';
import styles from './Projects.module.css';
import LinkButton from '../Layouts/LinkButton';
import ProjectCard from '../Project/ProjectCard';
import Load from '../Layouts/Load';

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoad, setRemoveLoad] = useState(false)
    const [projectMessge, setProjectMessge] = useState('')

    const location = useLocation()
    let message = ''
    if(location.state) {
      message = location.state.message
    }

    useEffect(() => {
      setTimeout(
        () => {
          fetch('http://localhost:5000/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          })
          .then(resp => resp.json())
          .then((data) => {
            setProjects(data)
            setRemoveLoad(true)
          })
          .catch((err) => console.log(err))
        }, 1200)
    }, [])

    function removeProject(id) {
      fetch(`http://localhost:5000/projects/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(resp => resp.json())
        .then(() => {
          setProjects(projects.filter((project) => project.id !== id))
          setProjectMessge('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
      <div className={styles.project_container}>
        <div className={styles.title_container}>
          <h1>Meus Projetos</h1>
          <LinkButton to='/newproject' text='Criar Projeto'/>
        </div>

        {message && <Message type='success' msg={message}/>}
        {projectMessge && <Message type='error' msg={projectMessge}/>}

        <Container customClass='start'>
          {projects.length > 0 &&
            projects.map((project) => <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name} key={project.id} handleRemove={removeProject}/>)
          }
          {!removeLoad && <Load/>}
          {removeLoad && projects.length === 0 && (
            <p>Sem projetos!</p>
          )}
        </Container>
      </div>
    );
  }
  
  export default Projects;