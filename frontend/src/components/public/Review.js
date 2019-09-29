import React from "react";
import { connect } from "react-redux";
import reviewService from "../../services/review";
import { setNotification } from "../../reducers/notificationReducer";
import RenderStars from "../RenderStars";

const Review = ({ review, user, setNotification }) => {
  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete " + id)) {
      try {
        reviewService.removeReview(id);
        setNotification("Review deleted successfully", "success", 2);
      } catch {
        setNotification("Something went wrong", "error", 2);
      }
    }
  };

  return (
    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <div class="media text-muted pt-3">
        <p class="media-body pb-3 mb-0 small lh-125">
          <div className="row">
            <div className="col-md 8">
              <strong class="d-block text-gray-dark">{review.title}</strong>
              {review.description}
            </div>
            <div className="col-md 2">
              <strong class="d-block text-gray-dark">Recommended</strong>
              {review.recommended ? "Yes" : "No"}
            </div>
            <div className="col-md 2">
              <RenderStars stars={review.stars} />
            </div>
          </div>
          {user && user._id === review.postedBy && (
            <button
              onClick={() => handleDelete(review._id)}
              className="btn btn-outline-danger btn-sm mb-0 pb-0 mt-2"
            >
              Delete
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { setNotification }
)(Review);
