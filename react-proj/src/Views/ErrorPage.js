import { Component } from "react";
import { Helmet } from "react-helmet";
import styles from './ErrorPage.module.css'

class ErrorPage extends Component {
    constructor(props) {
        super(props)
    }

    renderHelmet() {
        return (
            <Helmet>
                <title>Error | The Recipe Archive</title>
            </Helmet>
        )
    }

    render() {
        return (
            <div className={styles.errorPageContainer}>
                {this.renderHelmet()}
                <h1>It appears that the page you are looking for does not exist. Please try again.</h1>
            </div>
        )
    }
} 

export default ErrorPage