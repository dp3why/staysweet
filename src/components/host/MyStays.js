import { message, List, Card, Image, Carousel } from "antd";
// import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
import { getStaysByHost } from "../../utils";
import { ViewReservationsButton } from "./ViewReservationsButton";
import { RemoveStayButton } from "./RemoveStayButton";
import { StayDetailInfoButton } from "../StayDetailInfoButton";

export default class MyStays extends React.Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({
      loading: true,
    });

    try {
      const resp = await getStaysByHost();
      this.setState({
        data: resp,
      });
      // lising information
      // console.log(this.state.data);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <List
        loading={this.state.loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={this.state.data}
        renderItem={(item) => (
          <List.Item>
            <Card
              key={item.id}
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text ellipsis={true} style={{ maxWidth: 150 }}>
                    {item.name}
                  </Text>
                  <StayDetailInfoButton stay={item} />
                </div>
              }
              actions={[<ViewReservationsButton stay={item} />]}
              extra={
                <RemoveStayButton stay={item} onRemoveSuccess={this.loadData} />
              }
            >
              {
                <Carousel
                  dots={true}
                  autoplay={true}
                  fade={true}
                  autoplaySpeed={5000}
                  // arrows={true}
                  // prevArrow={<LeftCircleFilled />}
                  // nextArrow={<RightCircleFilled />}
                >
                  {item.images.map((image, index) => (
                    <div key={index}>
                      <Image src={image} width="100%" alt="stay image" />
                    </div>
                  ))}
                </Carousel>
              }
            </Card>
          </List.Item>
        )}
      />
    );
  }
}
