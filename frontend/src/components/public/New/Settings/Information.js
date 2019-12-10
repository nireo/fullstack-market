import React from 'react';

export const Information = ({ user }) => {
  return (
    <div>
      <div className="row">
        <div className="col-2">Email</div>
        <div className="col-10">{user.email}</div>
      </div>
      <div className="row">
        <div className="col-2">Username</div>
        <div className="col-10">{user.username}</div>
      </div>
      <div className="row">
        <div className="col-2">Posts</div>
        <div className="col-10">{user.posts.length}</div>
      </div>
      <div className="row">
        <div className="col-2">Reviews</div>
        <div className="col-10">{user.reviewsPosted.length}</div>
      </div>
      <div className="row">
        <div className="col-2">Wishlist</div>
        <div className="col-10">{user.wishlist.length}</div>
      </div>
      <div className="row">
        <div className="col-2">Items Bought</div>
        <div className="col-10">
          {user.mainItemsBought.length + user.communityItemsBought.length}
        </div>
      </div>
    </div>
  );
};
