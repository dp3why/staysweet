import React from "react";
import { message, Form, DatePicker, Button, Modal } from "antd";
import { bookStay } from "../../utils";
import { ShopOutlined } from "@ant-design/icons";
export class BookStayButton extends React.Component {
  state = {
    loading: false,
    modalVisible: false,
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleBookStay = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleSubmit = async (values) => {
    const { stay } = this.props;
    this.setState({
      loading: true,
    });

    try {
      await bookStay({
        checkInDate: values.checkin_date.format("YYYY-MM-DD"),
        checkOutDate: values.checkout_date.format("YYYY-MM-DD"),
        listingId: stay.id,
      });
      message.success("Successfully book stay");
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { stay } = this.props;
    return (
      <>
        <Button
          onClick={this.handleBookStay}
          shape="round"
          size="large"
          type="primary"
          icon={<ShopOutlined />}
        >
          Book Stay
        </Button>
        <Modal
          destroyOnClose={true}
          title={stay.name}
          open={this.state.modalVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Form
            preserve={false}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={this.handleSubmit}
          >
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
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                loading={this.state.loading}
                type="primary"
                htmlType="submit"
              >
                Book
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
