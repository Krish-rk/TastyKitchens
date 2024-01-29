import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    error: false,
    msg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({
        error: true,
        msg: data.error_msg,
      })
    }
  }

  render() {
    const {error, msg} = this.state
    return (
      <div>
        <div>
          <div>
            <form onSubmit={this.submitForm}>
              <label htmlFor="user">Username</label>
              <input
                type="text"
                placeholder="username"
                id="user"
                onChange={this.onChangeUsername}
              />
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                placeholder="password"
                id="pass"
                onChange={this.onChangePassword}
              />
              <button type="submit">Submit</button>
              {error ? <p>*{msg}</p> : ''}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
