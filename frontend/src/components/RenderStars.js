import React from 'react';

const RenderStars = ({ stars }) => {
  return (
    <div>
      {stars <= 5 ? <i class="fas fa-star"></i> : <i class="far fa-star"></i>}
      {stars <= 4 ? <i class="fas fa-star"></i> : <i class="far fa-star"></i>}
      {stars <= 3 ? <i class="fas fa-star"></i> : <i class="far fa-star"></i>}
      {stars <= 2 ? <i class="fas fa-star"></i> : <i class="far fa-star"></i>}
      {stars <= 1 ? <i class="fas fa-star"></i> : <i class="far fa-star"></i>}
    </div>
  );
};

export default RenderStars;
