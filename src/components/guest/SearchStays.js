import React from "react";
// import dayjs from "dayjs";
import {
  Image,
  message,
  List,
  Form,
  InputNumber,
  DatePicker,
  Button,
  Card,
  Carousel,
  Typography,
} from "antd";
import { searchStays } from "../../utils";

import { StayDetailInfoButton } from "../StayDetailInfoButton";
import { BookStayButton } from "./BookStayButton";

const { Text } = Typography;

export class SearchStays extends React.Component {
  state = {
    data: [],
    loading: false,
  };

  search = async (query) => {
    this.setState({
      loading: true,
    });

    try {
      const resp = await searchStays(query);
      this.setState({
        data: resp,
      });
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
      <>
        <Form onFinish={this.search} layout="inline">
          <Form.Item
            label="Guest Number"
            name="guest_number"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="Checkin Date"
            name="checkin_date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Checkout Date"
            name="checkout_date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button
              loading={this.state.loading}
              type="primary"
              htmlType="submit"
            >
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
        <List
          style={{ marginTop: 20 }}
          loading={this.state.loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item>
              <Card
                key={item.id}
                cover={
                  <Carousel
                    dots={true}
                    autoplay={true}
                    autoplaySpeed={6000}
                    // arrows={true}
                  >
                    {item.images.map((image, index) => (
                      <div key={index}>
                        <Image src={image} width="100%" />
                      </div>
                    ))}
                  </Carousel>
                }
                extra={null}
                actions={[
                  <StayDetailInfoButton stay={item} />,
                  <BookStayButton stay={item} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                      {item.name}
                    </Text>
                  }
                  description={item.address}
                />
              </Card>
            </List.Item>
          )}
        />
      </>
    );
  }
}
