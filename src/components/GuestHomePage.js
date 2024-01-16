import React from "react";
import { Tabs } from "antd";
import { MyReservations } from "./guest/MyReservations";
import { SearchStays } from "./guest/SearchStays";

const { TabPane } = Tabs;

class GuestHomePage extends React.Component {
  render() {
    return (
      <div
        style={{
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Tabs defaultActiveKey="1" destroyInactiveTabPane={true} size="large">
          <TabPane tab="Search Stays" key="1">
            <SearchStays />
          </TabPane>
          <TabPane tab="My Reservations" key="2">
            <MyReservations />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default GuestHomePage;
