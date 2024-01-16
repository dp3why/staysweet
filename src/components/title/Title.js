import { Col, Row, Typography } from "antd";
import React from "react";
import TypewriterComponent from "typewriter-effect";

const Title = () => {
  return (
    <div
      style={{
        height: "68vh",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <Col align="center" style={{ marginLeft: 30 }}>
        <Row
          span={12}
          justify="start"
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          <span style={{ marginRight: 20 }}>Stay</span>
          <TypewriterComponent
            options={{
              strings: [" Sweet", " Cozy", " Elegant", " Luxurious"],
              autoStart: true,
              loop: true,
              delay: 80,
            }}
          />
        </Row>
        <Row style={{ marginLeft: 4 }}>
          <Typography.Title style={{ color: "white", fontSize: 30 }}>
            Explore For Your Perfect Getaway
          </Typography.Title>
        </Row>
      </Col>
    </div>
  );
};

export default Title;
