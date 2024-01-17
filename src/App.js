import { Layout, Dropdown, Menu, Image, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";
import HostHomePage from "./components/HostHomePage";
import GuestHomePage from "./components/GuestHomePage";
import Title from "./components/title/Title";

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  state = {
    authed: false,
    asHost: false,
  };

  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const asHost = localStorage.getItem("asHost") === "true";
    this.setState({
      authed: authToken !== null,
      asHost,
    });
  }

  handleLoginSuccess = (token, asHost) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asHost", asHost);
    this.setState({
      authed: true,
      asHost,
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asHost");
    this.setState({
      authed: false,
    });
  };

  renderContent = () => {
    if (!this.state.authed)
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    if (this.state.asHost) return <HostHomePage />;
    return <GuestHomePage />;
  };

  userMenu = (
    <Menu
      items={[
        {
          key: "logout",
          label: <span onClick={this.handleLogOut}>LOGOUT</span>,
        },
      ]}
    />
  );

  render() {
    return (
      <Layout>
        <Content style={{ overflow: "auto" }}>
          <div
            className="hero-background"
            style={{
              backgroundImage: `url("/images/hero1.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: 600,
              width: "100%",
            }}
          >
            <Header
              style={{
                background: "transparent",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "bottom",
                }}
              >
                <Image
                  src="/images/small.png"
                  style={{
                    borderRadius: "80%",
                    width: 50,
                    height: 50,
                  }}
                  preview={false}
                  alt="logo"
                />
                <h1
                  style={{
                    marginLeft: 10,
                    fontSize: 33,
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  StaySweet
                </h1>
              </div>
              {this.state.authed && (
                <div>
                  <Dropdown trigger="click" overlay={this.userMenu}>
                    <Button icon={<UserOutlined />} shape="circle" />
                  </Dropdown>
                </div>
              )}
            </Header>

            <Title />
          </div>

          {this.renderContent()}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <h4>StaySweet ©{new Date().getFullYear()} by dp3why</h4>
          <p>Short Rental Booking Web App</p>
        </Footer>
      </Layout>
    );
  }
}

export default App;
