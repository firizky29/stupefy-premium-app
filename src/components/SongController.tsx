import React from 'react';
import PropTypes from 'prop-types';

const SongController = (props: any) => {
    if(!props.show){
        return (
            <div className="song-controller">
                <div className="song-info">
                    <p className="song-title">Terluka Bangetttttttttttttt</p>
                    <p className="song-artist">DeeGeeDow</p>
                </div>
                <audio id="song-controller-content" controls >
                    <source type="audio/mp3" id="home_src_mp3" src={props.song} />
                    <source type="audio/ogg" id="home_src_ogg" src={props.song} />
                    Your browser does not support the audio element.
                </audio>
            </div>
        )
    } else{
        return null;
    }
};

SongController.propTypes = {
    
};

export default SongController;