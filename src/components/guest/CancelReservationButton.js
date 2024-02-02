import React from "react";
import { message, Button, Modal } from "antd";
import { cancelReservation } from "../../utils";

export class CancelReservationButton extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  handleCancelReservation = async () => {
    const { reservationId, onCancelSuccess } = this.props;
    this.setState({
      loading: true,
    });

    try {
      await cancelReservation(reservationId);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }

    onCancelSuccess();
  };

  handleButtonClicked = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button
          loading={this.state.loading}
          onClick={this.handleButtonClicked}
          danger={true}
          shape="round"
          type="primary"
        >
          Cancel
        </Button>
        <Modal
          centered
          title="Cancel your reservation"
          open={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleCancelReservation}
          okText="Yes"
        >
          <p>
            You are going to cancel your reservation. Are you sure to continue?
          </p>
        </Modal>
      </>
    );
  }
}
