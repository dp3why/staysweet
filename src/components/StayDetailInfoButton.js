import { Button, Tooltip, Space, Modal } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";

export class StayDetailInfoButton extends React.Component {
  state = {
    modalVisible: false,
  };

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { stay } = this.props;
    const { name, description, address, guestNumber } = stay;
    const { modalVisible } = this.state;
    return (
      <>
        <Tooltip title="View Stay Details">
          <Button
            shape="round"
            onClick={this.openModal}
            size="large"
            icon={<HomeOutlined />}
          >
            Details
          </Button>
        </Tooltip>
        {modalVisible && (
          <Modal
            title={name}
            centered={true}
            open={modalVisible}
            width="70%"
            footer={null}
            onCancel={this.handleCancel}
          >
            <Space direction="vertical">
              <Text strong={true}>Description</Text>
              <Text type="secondary">{description}</Text>
              <Text strong={true}>Address</Text>
              <Text type="secondary">{address}</Text>
              <Text strong={true}>Guest Number</Text>
              <Text type="secondary">{guestNumber}</Text>
            </Space>
          </Modal>
        )}
      </>
    );
  }
}
