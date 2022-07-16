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
export default class editComments extends Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.editCommentModal}
                    toggle={this.props.toggleEditCommentModal}
                >
                    <ModalHeader toggle={this.props.toggleEditCommentModal}>
                        Update Comment
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="user_id">User</Label>
                            <Input
                                id="user_id"
                                name="user_id"
                                value={this.props.editCommentData.user_id}
                                onChange={this.props.onChangeEditCommentHanler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="comment">Comment</Label>
                            <Input
                                id="comment"
                                name="comment"
                                value={this.props.editCommentData.comment}
                                onChange={this.props.onChangeEditCommentHanler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.props.updateComment}
                        >
                            Update
                        </Button>
                        <Button
                            color="secondary"
                            onClick={this.props.toggleEditCommentModal}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
