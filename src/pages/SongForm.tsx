import React, { SyntheticEvent, useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/form.css';
import AddSongIcon from '../assets/img/icons-add-song-grey.png';

const array = [{ id: 1, name: 'song4' }, { id: 2, name: 'song2' }, { id: 3, name: 'song3' }];

const SongForm = (props: any) => {
    const [song, setSong] = useState<any | null>(null);
    const [audioName, setAudioName] = useState("Select song file");
    const [title, setTitle] = useState("");

    const [errors, setErrors] = useState({
        title: '',
        audio: '',
        message: ''
    });

    const submit = (event: SyntheticEvent) => {
        event.preventDefault();
        if(!errors.title && !errors.audio && !errors.message) {
            console.log("submit");
        }
    }

    const getSong = (event: SyntheticEvent) => {
        (document.getElementById("song-file") as HTMLInputElement).click();
    }
    
    const previewSong = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        let files = target.files;
        if (files) {
            if (files[0].size > 10e6) {
                setErrors({ ...errors, audio: 'Song size must be less than 10MB' });
            }
            else {
                let fileReader = new FileReader();
                fileReader.readAsDataURL(files[0]);
                setAudioName(files[0].name);
                fileReader.onload = (e) => {
                    setSong(e.target?.result);
                }
                
                fileReader.onerror = (error) => {
                    setErrors({ ...errors, audio: 'There is an error while reading file' });
                    setAudioName("Select song file");
                }

                fileReader.onabort = (error) => {
                    setErrors({ ...errors, audio: 'There is an error while reading file' });
                    setAudioName("Select song file");
                }

            }
        }
    
        
    }

    const onInputTitle = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        if (value.length > 255) {
            setErrors({ ...errors, title: 'Title must be less than 100 characters' });
        }
        else if(value.length === 0) {
            setErrors({ ...errors, title: 'Title is required' });
        }
        else {
            setErrors({ ...errors, title: '' });
        }
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
                        <input type="text" name="song-title" id="song-title" placeholder="Song Title" required onInput={onInputTitle}/>
                        <div className="error-message">{errors.title}</div>
                    </div>
                </div>

                <div className="input-container song-uploader">
                    <label>Upload Song File</label>
                    <div className="field-with-icon">
                        <img src={AddSongIcon} alt="Add Song Icon" />
                        <div className="file-uploader">
                            <input type="text" name="song-path" id="song-path" placeholder={audioName} disabled required />
                            <div className="upload-button" onClick={getSong}>Select File</div>
                        </div>
                        <input type="file" name="song-file" id="song-file"
                            accept="audio/*" onChange={previewSong} required hidden />
                    </div>
                    <div className="error-message">{errors.audio}</div>

                    <audio id="add-audio" controls >
                        <source type="audio/mp3" id="src_mp3" src={song} />
                        <source type="audio/ogg" id="src_ogg" src={song} />
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