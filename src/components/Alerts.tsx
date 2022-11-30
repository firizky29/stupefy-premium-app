import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Alerts = (props: any) => {
    const onCloseAlert = () => {
        props.setShowAlert(false);
        props.setAlert({
            type: '',
            message: ''
        });
    }
    return (
        <div className="alert">
            {props.showAlert && props.alert.type === 'success' && (
                <Alert variant="success" onClose={onCloseAlert} dismissible>
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>
                        {props.alert.message}
                    </p>
                </Alert>
            )}
            {props.showAlert && props.alert.type === 'error' && (
                <Alert variant="danger" onClose={onCloseAlert} dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>
                        {props.alert.message}
                    </p>
                </Alert>
            )}
        </div>
    );
};

export default Alerts;