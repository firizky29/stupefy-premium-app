import React from 'react';
import PropTypes from 'prop-types';

const array = [{id: 1, name: 'song4'}, {id: 2, name: 'song2'}, {id: 3, name: 'song3'}];

const SongForm = (props: any) => {
    return (
        <div className='content'>
        <div className="container-title">
            Your Song
        </div>
        <table className="contents">
            <tbody>
            {
                Array.isArray(array) ? array.map((item:any) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                        </tr>
                    )
                }) : null

            }
            </tbody>
        </table>
    </div>
    );
};

SongForm.propTypes = {
    
};

export default SongForm;