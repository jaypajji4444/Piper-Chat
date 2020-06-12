import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';


const Alert = ({alerts}) => {
    function notify(text, type) {
            switch (type) {
            case 'info':
                toast.info(`${text}`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
                break;
            case 'error':
                toast.error(`${text}`, {
                position: 'top-left',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
                break;
                default:break
            }
        }


return (
    <div>
        {alerts!==null && alerts.length>0?alerts.map(alert=>{
            notify(alert.msg,alert.alertType)
            return <div key={alert.id} ></div>
        }):null}
    </div>
)
}

const mapStateToProps = (state) =>{
    return{
        alerts : state.alert
    }
}

Alert.propTypes={
    alerts : PropTypes.array.isRequired
}

export default connect(mapStateToProps,null)(Alert);