import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Typography, TextField, Button, Alert, AlertTitle } from '@mui/material'
import { INVALID_CREDENTIALS, NAME_CHANGE_ERROR, NAME_CHANGE_SUCCESS ,PASSWORDS_SAME,PASSWORD_CHANGE_SUCCESS, PASSWORD_MISMATCH, SECONDARY_COLOUR } from '../Constants'
import { updateFBName, updateFBPassword } from '../api/User'


class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            enteredName: this.props.name,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            errorMessage: '',
            successMessage: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (!this.props.isUserLoggedIn) {
            this.props.history.push('/')
        }    
    }

    renderSuccessAlert() {
        if (this.state.successMessage.length > 0) {
            return (
                <Alert severity="success" sx={{ marginTop: 2 }}>
                    <AlertTitle>Success</AlertTitle>
                    {this.state.successMessage}
                </Alert>
            )
        }
    }

    renderErrorAlert() {
        if (this.state.errorMessage.length > 0) {
            return (
                <Alert severity="error" sx={{ marginTop: 2 }}>
                    <AlertTitle>Error</AlertTitle>
                    {this.state.errorMessage}
                </Alert>
            )
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ errorMessage: '', successMessage: '' })

        let promiseArray = []

        if (this.state.enteredName !== this.props.name) {
            promiseArray.push(updateFBName(this.state.enteredName).then(res => {
                if (res === NAME_CHANGE_SUCCESS) {
                    return 'Successfully changed name associated with account.'
                }

            }))
        }

        if (this.state.currentPassword !== '' && this.state.newPassword !== '' && this.state.confirmNewPassword !== '') {
            if (this.state.newPassword === this.state.confirmNewPassword) {
                promiseArray.push(updateFBPassword(this.state.currentPassword, this.state.newPassword).then(res => {
                    let successMessage = ''
                    if (res === PASSWORD_CHANGE_SUCCESS) {
                        successMessage = 'Your password has been successfully changed.'
                    }
                    
                    return successMessage
                }))
            }
        }


        if (promiseArray.length > 0) {
          Promise.allSettled(promiseArray)
            .then(res => {
                let tempSuccessMessage = ''
                let tempErrorMessage = ''
                
                if (res.length > 0) {
                    res.forEach(item => {
                        console.log(item)
                        if (item.status === 'fulfilled') {
                            tempSuccessMessage += `${item.value} `
                        }
                        else {
                            if (item.value === NAME_CHANGE_ERROR) {
                                tempErrorMessage += 'Unable to change name. Please try again.'

                            }
                            
                            if (item.value === INVALID_CREDENTIALS) {
                                tempErrorMessage += 'The entered information is not present in our records. Please try again.'
                
                            }
                            else if (item.value === PASSWORDS_SAME) {
                                tempErrorMessage += 'The entered passwords (old and new) are the same. Please try again.'
                
                            }
                            else {
                                tempErrorMessage = 'There appears to be an internal error. Please refresh the app and try again.'
                            }
                            // tempErrorMessage += `${item.value} `
                        }
                    })
                }

                this.setState({ currentPassword: '', newPassword: '', confirmNewPassword: '', successMessage: tempSuccessMessage, errorMessage: tempErrorMessage })
            })
            
        }
        else {
            if (this.state.newPassword !== this.state.confirmNewPassword) {
                this.setState({ errorMessage: 'The passwords do not match. Please try again.' })
            }
            else {
                this.setState({ errorMessage: 'No information has been changed. Please try again.' })
            }
        }
       
    }


    render() {
        return (
            <div
              className="search-results-container"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
                <Grid container width="60%"  borderRadius={10} border={`2px solid ${SECONDARY_COLOUR}`} direction='column' padding={5}>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container item direction='column'>
                            <h4>Name</h4>
                            <TextField value={this.state.enteredName} onChange={event => this.setState({ enteredName: event.target.value })} />
                        </Grid>
                        <Grid container item direction='column'>
                            <h4>Password</h4>
                            <TextField type='password' sx={{ paddingBottom: 2 }} value={this.state.currentPassword} onChange={event => this.setState({ currentPassword: event.target.value })} label='Current Password' />
                            <TextField type='password' sx={{ paddingBottom: 2 }} value={this.state.newPassword} onChange={event => this.setState({ newPassword: event.target.value })} label='New Password' />
                            <TextField type='password' sx={{ paddingBottom: 2 }} value={this.state.confirmNewPassword} onChange={event => this.setState({ confirmNewPassword: event.target.value })} label='Confirm New Password' />
                        </Grid>
                        <Button type='submit' variant='contained'>Apply</Button>
                    </form>
                    {this.renderErrorAlert()}
                    {this.renderSuccessAlert()}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { name, isUserLoggedIn } = state.user
    return { name, isUserLoggedIn }
}

export default connect(mapStateToProps)(Profile)