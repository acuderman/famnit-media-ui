import React, { useState, useEffect } from 'react'
import { GoogleLogin, GoogleLogout} from 'react-google-login';

const GoogleAuth = (props) => {
    const clientId = '67524598759-f23fu4cl8pkjfguf196eknut03ej4h0p.apps.googleusercontent.com'

    if(!props.signedIn) {
        return <GoogleLogin
                clientId={clientId}
                scope={'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.upload'}
                buttonText="Login"
                onSuccess={props.onSignInResponse}
                onFailure={props.onSignOutResponse}
                cookiePolicy={'single_host_origin'}
            />
    }
    return (
    <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={props.onSignOutResponse} />
    )
}

export default GoogleAuth
