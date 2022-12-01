import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import { API_URL } from '../config';

const SongController = (props: any) => {
    // console.log(!props.songId)
    if(props.showSongController){
        return (
            <div className="song-controller">
                <div className="song-info">
                    <p className="song-title">{props.songName}</p>
                    <p className="song-artist">{props.user.name}</p>
                </div>
                <ReactAudioPlayer
                    src={API_URL + '/song/' + props.songId}
                    controls
                    autoPlay
                />
            </div>
        )
    } else{
        return null;
    }
};

SongController.propTypes = {
    
};

export default SongController;