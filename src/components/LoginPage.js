import React from "react";
import { Form, Button, Input, Space, Checkbox, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { login, register } from "../utils";

class LoginPage extends React.Component {
  formRef = React.createRef();
  state = {
    asHost: false,
    loading: false,
  };

  onFinish = () => {
    console.log("finish form");
  };

  handleLogin = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      const { asHost } = this.state;
      const resp = await login(formInstance.getFieldsValue(true));
      this.props.handleLoginSuccess(resp.token, asHost);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleRegister = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      await register({
        ...formInstance.getFieldsValue(true),
        role: this.state.asHost ? "ROLE_HOST" : "ROLE_GUEST",
      });
      message.success("Register Successfully");
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleCheckboxOnChange = (e) => {
    this.setState({
      asHost: e.target.checked,
    });
  };

  render() {
    return (
      <div style={{ width: 500, margin: "40px auto" }}>
        <Form ref={this.formRef} onFinish={this.onFinish} size="large">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "PLEASE INPUT USERNAME!",
              },
            ]}
          >
            <Input
              disabled={this.state.loading}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "PLEASE INPUT PASSWORD!",
              },
            ]}
          >
            <Input.Password
              disabled={this.state.loading}
              placeholder="Password"
            />
          </Form.Item>
        </Form>
        <Space>
          <Checkbox
            disabled={this.state.loading}
            checked={this.state.asHost}
            onChange={this.handleCheckboxOnChange}
          >
            AS HOST
          </Checkbox>
          <Button
            onClick={this.handleLogin}
            disabled={this.state.loading}
            shape="round"
            type="primary"
            size="large"
          >
            LOGIN
          </Button>
          <Button
            onClick={this.handleRegister}
            disabled={this.state.loading}
            shape="round"
            type="primary"
            size="large"
          >
            REGISTER
          </Button>
        </Space>
      </div>
    );
  }
}

export default LoginPage;
