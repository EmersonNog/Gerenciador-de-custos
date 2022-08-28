import {FaGithub, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.item}> 
                <li>
                    <a href="https://github.com/EmersonNog" target="_blank"><FaGithub/></a>
                </li>

                <li>
                    <a href="https://www.instagram.com/noggueira/" target="_blank"><FaInstagram/></a>
                </li>

                <li>
                    <a href="https://www.linkedin.com/in/noggueira/" target="_blank"><FaLinkedin/></a>
                </li>
            </ul>
            <p className={styles.copy}>
                <span>Cost Management </span>&copy; 2022
            </p>
        </footer>
    )
}

export default Footer