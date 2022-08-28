import styles from './Company.module.css';
import savings from '../../img/logo_home.png';

function Company() {
    return (
        <section className={styles.company}>
          <h1>Cost Management</h1>
          <p>
            Uma aplicação para gerenciar seus projetos de forma mais eficaz,
            controlando seus gastos de orçamentos e com uma categorização dinâmica!
            Tenha em mãos também, um gerenciador de serviços adicionais para seu projeto, 
            e monitore seus custos!
          </p>
          <img src={savings} alt='costs'></img>
          
        </section>
    );
  }
  
export default Company;