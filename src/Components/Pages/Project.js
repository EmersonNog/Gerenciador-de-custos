import styles from './Project.module.css';

import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {parse, v4 as uuidv4} from 'uuid';

import Load from '../Layouts/Load';
import Container from '../Layouts/Container';
import ProjectForm from '../Project/ProjectForm';
import Message from '../Layouts/Message';
import ServiceForm from '../Service/ServiceForm';
import ServiceCard from '../Service/ServiceCard';

function Project() {

    const {id} = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [show, setShow] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.service)
            })
            .catch((err) => console.log)
            }, 500)
            }, [id])

            function editPost(project) {
                setMessage('')
                if(project.budget < project.cost) {
                    setMessage('O orçamento não pode ser menor que o custo do projeto!')
                    setType('error')
                    return false
                }

                fetch(`http://localhost:5000/projects/${project.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(project),
                })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setShow(false)
                    setMessage('Projeto Atualizado!')
                    setType('success')
                })
                .catch(err => console.log(err))
            }

            function createService(project) {
                setMessage('')
                const lastService = project.service[project.service.length -1]

                lastService.id = uuidv4()

                const lastServiceCost = lastService.cost

                const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

                if(newCost > parseFloat(project.budget)) {
                    setMessage('Orçamento ultrapassado, verifique o valor desse serviço.')
                    setType('error')
                    project.service.pop()
                    return false
                }

                project.cost = newCost

                fetch(`http://localhost:5000/projects/${project.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(project)
                })
                    .then((resp) => resp.json())
                    .then((data) => {
                        setShowServiceForm(false)
                    })
                    .catch((err) => console.log(err))

            }

            function removeService(id, cost) {
                const servicesUpdate = project.service.filter(
                    (service_param) => service_param.id !== id
                )

                const projectUpdated = project

                projectUpdated.service = servicesUpdate
                projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
                if(projectUpdated.cost < 0) {
                    projectUpdated.cost = 0;
                }

                fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(projectUpdated)
                })
                    .then((resp) => resp.json())
                    .then((data) => {
                        setProject(projectUpdated)
                        setServices(servicesUpdate)
                        setMessage('Serviço removido com sucesso!')
                        setType('success')
                    })
                    .catch((err) => console.log(err))
            }

            function toggleProjectFrom() {
                setShow(!show)
            }

            function toggleServiceFrom() {
                setShowServiceForm(!showServiceForm)
            }

    return (
            <>
                {project.name ? (
                <div className={styles.project_details}>
                    <Container custumClass='column'>
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectFrom}>{!show ? `Editar Projeto` : 'Fechar'}</button>
                            {!show ? (
                                <div className={styles.projectInfo}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.projectInfo}>
                                    <ProjectForm handleSubmit={editPost} btnText='Concluir Edição' projectData={project}/>
                                </div>
                            )}
                        </div>
                        
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceFrom}>{!showServiceForm ? `Adicionar serviço` : 'Fechar'}</button>
                            <div className={styles.projectInfo}>
                                {showServiceForm && 
                                    <ServiceForm handleSubmit={createService} textBtn='Adicionar serviço' projectData={project}/>
                                }
                            </div>
                        </div>
                        <div className={styles.service_form_container_itens}>
                        <h2>Serviços</h2>
                        <Container custumClass="">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard 
                                        id={service.id} 
                                        name={service.name} 
                                        cost={service.cost} 
                                        description={service.description} 
                                        key={service.key} 
                                        handleRemove={removeService} 
                                    
                                    />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços!</p>}
                        </Container>
                            
                        </div>
                    </Container>
                </div>
                ) : ( 
                    <Load/>
                )}
            </>
    )
}

export default Project