import { Tabs } from "antd";
import React from "react";
import UploadStay from "./host/UploadStay";
import MyStays from "./host/MyStays";

const { TabPane } = Tabs;

class HostHomePage extends React.Component {
  render() {
    return (
      <div style={{ marginLeft: 20, marginRight: 20, marginTop: 64 }}>
        <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
          <TabPane tab="My Stays" key="1">
            <MyStays />
          </TabPane>
          <TabPane tab="Upload Stay" key="2">
            <UploadStay />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default HostHomePage;
