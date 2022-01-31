import React from 'react';
import { Player } from 'video-react';
import './Video.scss';

function Video({ source }) {
  return (
    <div className="video">
      <Player playsInline src={source} />
    </div>
  );
}

export default Video;
