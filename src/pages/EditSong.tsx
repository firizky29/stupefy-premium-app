import React, { SyntheticEvent, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AddSongIcon from '../assets/img/icons-add-song-grey.png';
import ReactAudioPlayer from 'react-audio-player';

import '../assets/css/form.css';

import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';

const EditSong = (props: any) => {
    const url = useParams();
    const [song, setSong] = useState<any | null>(null);
    const [useOldSong, setUseOldSong] = useState<boolean>(true);
    const [audioName, setAudioName] = useState("Select song file");
    const [title, setTitle] = useState("");

    let navigate = useNavigate();

    const [errors, setErrors] = useState({
        title: '',
        audio: '',
        message: ''
    });

    const submit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if(!errors.title && !errors.audio && !errors.message) {
            // Create song
            const form = document.getElementById("song-form") as HTMLFormElement;
            const formData = new FormData(form);
            // for(var pair of formData.entries()) {
            //     console.log(pair[0]+ ', '+ pair[1]);
            // }
            // console.log(formData)
            
            const response = await fetch(`${API_URL}/song/${url.id}`, {
                credentials: 'include',
                method: 'PUT',
                body: formData
            });

            if(response.status === 200){
                props.setShowAlert(true);
                props.setAlert({
                    type: 'success',
                    message: 'Song updated successfully'
                });
                navigate('/');
            } else{
                props.setShowAlert(true);
                props.setAlert({
                    type: 'error',
                    message: response.statusText
                })
            }

        }
    }

    const getSong = (event: SyntheticEvent) => {
        (document.getElementById("file") as HTMLInputElement).click();
    }
    
    const previewSong = (event: SyntheticEvent) => {
        event.preventDefault();
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
                    setUseOldSong(false);
                }
                
                fileReader.onerror = (error) => {
                    setErrors({ ...errors, audio: 'There is an error while reading file' });
                    setAudioName("Select song file");
                    setSong(null);
                }

                fileReader.onabort = (error) => {
                    setErrors({ ...errors, audio: 'There is an error while reading file' });
                    setAudioName("Select song file");
                    setSong(null);
                }

            }
        }
    
        
    }

    const onInputTitle = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        setTitle(value);
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


    const onLoad = () => {
        props.setShowSongController(false);
        setTitle(props.oldSongTitle);
    };

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <div className='content'>
            <div className="container-title">
                { props.formType }
            </div>
            <form onSubmit={submit} encType="multipart/form-data" className='contents' id='song-form'>
                <div className="input-group-0">
                    <div className="input-container">
                        <label>Title</label>
                        <input value = {title} type="text" name="Judul" id="title" placeholder="Song Title" required onInput={onInputTitle}/>
                        <div className="error-message">{errors.title}</div>
                    </div>
                </div>

                <div className="input-container song-uploader">
                    <label>Upload Song File</label>
                    <div className="field-with-icon">
                        <img src={AddSongIcon} alt="Add Song Icon" />
                        <div className="file-uploader">
                            <input type="text" name="song-path" id="song-path" placeholder={audioName} disabled />
                            <div className="upload-button" onClick={getSong}>Select File</div>
                        </div>
                        <input type="file" name="file" id="file"
                            accept="audio/*" onChange={previewSong} hidden />
                    </div>
                    <div className="error-message">{errors.audio}</div>

                    {useOldSong?
                        <ReactAudioPlayer src={`${API_URL}/song/${url.id}`} controls/>
                        : 
                        <audio id="add-audio" controls>
                            <source type="audio/mp3" id="src_mp3" src={song} />
                            <source type="audio/ogg" id="src_ogg" src={song} />
                            Your browser does not support the audio element.
                        </audio>
                    }
                </div>
                <input type="submit" value="Submit" name="submit-button" id="submit" />
            </form>
        </div>
    );
};

EditSong.propTypes = {

};

export default EditSong;