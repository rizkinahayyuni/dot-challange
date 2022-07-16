import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
export default class addComments extends Component {
    render() {
        return (
            <div>
                <Button
                    className="float-right mb-4"
                    color="primary"
                    onClick={this.props.toggleNewCommentModal}
                >
                    Add Comment
                </Button>
                <Modal
                    isOpen={this.props.newCommentModal}
                    toggle={this.props.toggleNewCommentModal}
                >
                    <ModalHeader toggle={this.props.toggleNewCommentModal}>
                        Add new Comment
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="first_name">User</Label>
                            <Input
                                id="user_id"
                                name="user_id"
                                value={this.props.newCommentData.first_name}
                                onChange={this.props.onChangeAddCommentHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="comment">Comment</Label>
                            <Input
                                id="comment"
                                name="comment"
                                value={this.props.newCommentData.last_name}
                                onChange={this.props.onChangeAddCommentHandler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() =>
                            this.props.addComment()}>
                            Add
                        </Button>{" "}
                        <Button color="secondary"
                            onClick={this.props.toggleNewCommentModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}