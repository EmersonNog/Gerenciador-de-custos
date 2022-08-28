import styles from './Home.module.css'
import savings from '../../img/logo_home.png'
import LinkButton from '../Layouts/LinkButton';

function Home() {
    return (
      <section className={styles.home}>
        <h1>Bem-vindo ao <span>Cost Management</span></h1>
        <p>Tenha uma controle mais eficiente dos seus projetos!</p>
        <LinkButton to='/newproject' text='Criar projeto'/>
        <img src={savings} alt='costs'></img>
      </section>
    );
  }
  
  export default Home;