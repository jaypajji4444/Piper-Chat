import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({alerts}) => alerts!==null &&
 alerts.length>0 &&
 alerts.map(alert=>{
     return(
     <div key={alert.id} className={alert.alertType}>{alert.msg}</div>
     )
 })
const mapStateToProps = (state) =>{
    return{
        alerts : state.alert
    }
}

Alert.propTypes={
    alerts : PropTypes.array.isRequired
}

export default connect(mapStateToProps,null)(Alert);