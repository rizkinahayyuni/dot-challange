import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import { Navigate, Redirect } from "react-router-dom";
import AddComments from './addComments';
import EditComments from './editComments';
import axios from "axios";

export default class Comments extends Component {
  state = {
    navigate: false,
  };

  onLogoutHandler = () => {
    localStorage.clear();
    this.setState({
      navigate: true,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      newCommentData: {
        user_id: "",
        comment: "",
      },
      isLoading: false,
      status: "",
      newCOmmentModal: false,
      editCommentData: {
        id: "",
        user_id: "",
        comment: "",
      },
      editCommentModal: false,
      noDataFound: "",
    };
  }
  componentDidMount() {
    this.getComments();
  }
  getComments() {
    axios.get("http://localhost:8000/api/comments").then((response) => {
      if (response.status === 200) {
        this.setState({
          comments: response.data.data ? response.data.data : [],
        });
      }
      if (
        response.data.status === "failed" &&
        response.data.success === false
      ) {
        this.setState({
          noDataFound: response.data.message,
        });
      }
    });
  }
  toggleNewCommentModal = () => {
    this.setState({
      newCommentModal: !this.state.newCommentModal,
    });
  };
  onChangeAddCommentHandler = (e) => {
    let { newCommentData } = this.state;
    newCommentData[e.target.name] = e.target.value;
    this.setState({ newCommentData });
  };
  addComment = () => {
    axios
      .post(
        "http://localhost:8000/api/create-comment",
        this.state.newCommentData
      )
      .then((response) => {
        const { comments } = this.state;
        const newComments = [...comments];
        newComments.push(response.data);
        this.setState(
          {
            comments: newComments,
            newCommentModal: false,
            newCommentData: {
              user_id: "",
              comment: "",
            },
          },
          () => this.getComments()
        );
      });
  };
  toggleEditCommentModal = () => {
    this.setState({
      editCommentModal: !this.state.editCommentModal,
    });
  };
  onChangeEditCommentHanler = (e) => {
    let { editCommentData } = this.state;
    editCommentData[e.target.name] = e.target.value;
    this.setState({ editCommentData });
  };
  editComment = (id, user_id, comment) => {
    this.setState({
      editCommentData: { id, user_id, comment },
      editCommentModal: !this.state.editCommentModal,
    });
  };

  updateComment = () => {
    let {
      id,
      user_id,
      comment,
    } = this.state.editCommentData;
    this.setState({
      isLoading: true,
    });
    axios
      .post("http://localhost:8000/api/create-comment", {
        user_id,
        comment,
        id,
      })
      .then((response) => {
        this.getComments();
        this.setState({
          editCommentModal: false,
          editCommentData: { user_id, comment },
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log(error.response);
      });
  };

  deletComment = (id) => {
    this.setState({
      isLoading: true,
    });
    axios
      .delete("http://localhost:8000/api/comment/" + id)
      .then((response) => {
        this.setState({
          isLoading: false,
        });
        this.getComments();
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
      });
  };
  render() {
    const user = JSON.parse(localStorage.getItem("userData"));
    const { navigate } = this.state;
    if (navigate) {
      return <Redirect to="/" push={true} />;
    }
    const { newCommentData, editCommentData, noDataFound, comments } =
      this.state;
    let commentsDetails = [];
    if (comments.length) {
      commentsDetails = comments.map((comment) => {
        return (
          <tr key={comment.id}>
            <td>{comment.id}</td>
            <td>{comment.user_id}</td>
            <td>{comment.comment}</td>
            <td>
              <Button
                color="success"
                className="mr-3"
                size="sm"
                onClick={() =>
                  this.editComment(
                    comment.id,
                    comment.user_id,
                    comment.comment,
                  )
                }
              >
                Edit
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => this.deletComment(comment.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      });
    }

    if (this.state.isLoading) {
      return <div className="spinner-border text-center" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    }
    return (
      <div>
        <div className="container border">
          <h3> HomePage</h3>
          <div className="row">
            <div className="col-xl-9 col-sm-12 col-md-9 text-dark">
              <h5> Welcome, {user.first_name} </h5> You have Logged in
              successfully.
            </div>
            <div className="col-xl-3 col-sm-12 col-md-3">
              <Button
                className="btn btn-primary text-right"
                onClick={this.onLogoutHandler}
              >
                Logout
              </Button>
            </div>
          </div>
          <div className="row">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="/home">Students</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/comments">Comments</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="App container mt-4">
          <h4 className="font-weight-bold">Comments</h4>
          <AddComments
            toggleNewCommentModal={this.toggleNewCommentModal}
            newCommentModal={this.state.newCommentModal}
            onChangeAddCommentHandler={this.onChangeAddCommentHandler}
            addComment={this.addComment}
            newCommentData={newCommentData}
          />
          <EditComments
            toggleEditCommentModal={this.toggleEditCommentModal}
            editCommentModal={this.state.editCommentModal}
            onChangeEditCommentHanler={this.onChangeEditCommentHanler}
            editComment={this.editComment}
            editCommentData={editCommentData}
            updateComment={this.updateComment}
          />
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            {comments.length === 0 ? (
              <tbody>
                <h3>{noDataFound}</h3>
              </tbody>
            ) : (
              <tbody>{commentsDetails}</tbody>
            )}
          </Table>
        </div>
      </div>
    );
  }
}
