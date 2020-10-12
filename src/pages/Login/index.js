import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/users/login", { email, password });
        login(response.data);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Credenciais inválidas."
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);