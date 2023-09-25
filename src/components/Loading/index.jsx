import React from "react";
import "./index.css";
const Loading = () => {
  return (
    <div className='loading'>
      <img
        src='/src/assets/images/loading_dualball.gif'
        alt='loading'
        className='loading_anim'
      />
    </div>
  );
};

export default Loading;
