import React from "react";
import {
  message,
  List,
  Typography,
  Descriptions,
  Card,
  Image,
  Modal,
  Button,
  Carousel,
} from "antd";
import { getReservations } from "../../utils";
import { CancelReservationButton } from "./CancelReservationButton";

const { Text } = Typography;

export class MyReservations extends React.Component {
  state = {
    loading: false,
    data: [],
    visible: false,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({
      loading: true,
    });

    try {
      const resp = await getReservations();
      this.setState({
        data: resp,
      });
      console.log(resp);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleOpen = () => {
    this.setState({
      visible: true,
    });
  };
  render() {
    return (
      <List
        style={{ margin: "auto" }}
        loading={this.state.loading}
        dataSource={this.state.data}
        renderItem={(item) => (
          <List.Item>
            <Card
              actions={[
                <Button type="primary" shape="round" onClick={this.handleOpen}>
                  Details
                </Button>,
                <CancelReservationButton
                  onCancelSuccess={this.loadData}
                  reservationId={item.id}
                />,
              ]}
              cover={
                <Image
                  style={{ cursor: "pointer" }}
                  onClick={this.handleOpen}
                  preview={false}
                  width={400}
                  src={item.listing.images[0]}
                />
              }
            >
              <Card.Meta
                title={<Text>{item.listing.name}</Text>}
                description={
                  <>
                    <Text>Checkin Date: {item.checkInDate}</Text>
                    <br />
                    <Text>Checkout Date: {item.checkOutDate}</Text>
                  </>
                }
              />
              <Modal
                width="70%"
                title="You Next Trip Details"
                open={this.state.visible}
                onCancel={this.handleCancel}
                mask={false}
                footer={null}
              >
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="Name">
                    {item.listing.name}
                  </Descriptions.Item>

                  <Descriptions.Item label="Address">
                    {item.listing.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {item.listing.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Your host">
                    {item.listing.host.username}
                  </Descriptions.Item>
                </Descriptions>
                <Carousel
                  autoplay={true}
                  autoplaySpeed={4000}
                  dotPosition="top"
                >
                  {item.listing.images.map((image) => (
                    <Image
                      key={image}
                      src={image}
                      alt="images"
                      style={{
                        height: "300px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </Carousel>
              </Modal>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}
