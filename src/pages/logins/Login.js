import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import AuthenticationService from "../../services/AuthenticationService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "kiendo3",
      password: "123",
      hasLoginFailed: false,
      showSuccessMessage: false,
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <span>
              <b>CyberTax Admin</b>
            </span>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              {/* action="../../index3.html" method="post" */}
              <form>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onKeyPress={this.handleLoginByKeyDown}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember"> Remember Me </label>
                    </div>
                  </div>
                  {/* /.col */}
                  <div className="col-12">
                    {/* <button type="button" className="btn btn-primary btn-block" onClick={this.handleLogin}>Sign In</button> */}

                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={this.handleLoginByMouseClick}
                    >
                      {loading && (
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sd"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      Đăng nhập
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              {/* /.social-auth-links */}
              <p className="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
              </p>
            </div>
            {/* /.login-card-body */}
            {!this.state.showSuccessMessage && this.state.hasLoginFailed && (
              <span className="card-body login-card-body text-danger">
                Đăng nhập thất bại
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  handleLoginByKeyDown = (e) => {
    if (e.key === "Enter") {
      if (this.state.username === null) {
        setTimeout(() => {
          alert("Không được bỏ trống mật khẩu");
        }, 1000);
      } else if (this.state.password === null || this.state.password === "") {
        setTimeout(() => {
          alert("Không được bỏ trông password");
        }, 1000);
      } else {
        this.setState({ loading: true });

        AuthenticationService.executeJwtAuthenticationService(
          this.state.username,
          this.state.password
        )
          .then((response) => {
            this.setState({ showSuccessMessage: true });
            this.setState({ hasLoginFailed: true });
            AuthenticationService.registerSuccessfulLoginForJwt(
              this.state.username,
              response.data.token
            );

            setTimeout(() => {
              this.props.history.push("/main/dashboard");
            }, 1000);
          })
          .catch((error) => {
            console.log("LOGIN FAIL", error.status);

            setTimeout(() => {
              this.setState({ showSuccessMessage: false });
              this.setState({ hasLoginFailed: true });
              this.setState({ loading: false });
            }, 1000);
          });
      }
    }
  };

  // xu ly login
  handleLoginByMouseClick = () => {
    // if (this.state.username === "dohung" && this.state.password === "@Hung123") {
    //   // alert("SUCCESS!");
    //   AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
    //   this.setState({ loading: true });
    //   setTimeout(() => {
    //     // this.setState({ loading: false });
    //     alert("Hello");
    //     this.props.history.push("/main/dashboard");
    //   }, 5000)

    // } else {
    //   alert("FAIL");
    // }

    this.setState({ loading: true });

    AuthenticationService.executeJwtAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then((response) => {
        this.setState({ showSuccessMessage: true });
        this.setState({ hasLoginFailed: true });

        //  console.log(response);
        // debugger
        AuthenticationService.registerSuccessfulLoginForJwt(
          this.state.username,
          response.data.token
        );

        setTimeout(() => {
          this.props.history.push("/main/dashboard");
        }, 1000);
      })
      .catch((error) => {
        console.log("LOGIN FAIL", error.status);

        setTimeout(() => {
          // alert("LOGIN FAIL");
          this.setState({ showSuccessMessage: false });
          this.setState({ hasLoginFailed: true });
          this.setState({ loading: false });
        }, 1000);
      });
  };

  //xu ly thay doi du lieu
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
}

export default Login;
