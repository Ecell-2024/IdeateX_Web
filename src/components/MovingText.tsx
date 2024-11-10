import React from "react";

function MovingText() {
  return (
    <div className="scrolling-container  flex items-center">
      <div className="moving-text">
        <b className="outlined-text">ECELL</b> / IDEATEX /{" "}
        <b
          className="outlined-text"
          style={{ textShadow: "1px 1px 2px #AD0C60" }}
        >
          REGISTER NOW
        </b>
      </div>
    </div>
  );
}

export default MovingText;
