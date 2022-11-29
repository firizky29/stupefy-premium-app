import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/form.css';
import AddSongIcon from '../assets/img/icons-add-song-grey.png';

const array = [{ id: 1, name: 'song4' }, { id: 2, name: 'song2' }, { id: 3, name: 'song3' }];

const SongForm = (props: any) => {
    const submit = () => {
        console.log('submit');
    }

    return (
        <div className='content'>
            <div className="container-title">
                Add Song
            </div>
            <form onSubmit={submit} encType="multipart/form-data" className='contents'>
                <div className="input-group-0">
                    <div className="input-container">
                        <label>Title</label>
                        <input type="text" name="song-title" id="song-title" placeholder="Song Title" required />
                    </div>
                </div>

                <div className="input-container song-uploader">
                    <label>Upload Song File</label>
                    <div className="field-with-icon">
                        <img src={AddSongIcon} alt="" />
                        <div className="file-uploader">
                            <input type="text" name="song-path" id="song-path" placeholder="Select song file" disabled required />
                            <div className="upload-button">Select File</div>
                        </div>
                        <input type="file" name="song-file" id="song-file"
                            accept="audio/*" required hidden />
                    </div>

                    <audio id="add-audio" controls >
                        <source type="audio/mp3" id="song-preview" src="" />
                        <source type="audio/ogg" id="song-preview" src="" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <input type="submit" value="Submit" name="submit-button" id="submit" />
            </form>
        </div>
    );
};

SongForm.propTypes = {

};

export default SongForm;