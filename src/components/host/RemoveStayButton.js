import { message, Button } from "antd";
import React from "react";
import { deleteStay } from "../../utils";

export class RemoveStayButton extends React.Component {
  state = {
    loading: false,
  };

  handleRemoveStay = async () => {
    const { stay, onRemoveSuccess } = this.props;
    this.setState({
      loading: true,
    });

    try {
      await deleteStay(stay.id);
      onRemoveSuccess();
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
      <Button
        loading={this.state.loading}
        onClick={this.handleRemoveStay}
        danger={true}
        shape="round"
        type="primary"
      >
        Remove Stay
      </Button>
    );
  }
}
