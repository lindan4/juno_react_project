import { Component } from "react";
import styles from './ErrorPage.module.css'

class ErrorPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.errorPageContainer}>
                <h1>It appears that the page you are looking for does not exist. Please try again.</h1>
            </div>
        )
    }
} 

export default ErrorPage