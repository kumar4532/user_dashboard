import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useAuth from "../zustand/useAuth";

const GoogleAuthBtn = () => {
    const { setAuthUser } = useAuth();

    const clientId = '862864069823-11adoev9bdof8f3hiu55u3m5587tdnn4.apps.googleusercontent.com';

    return (
        <div className='flex justify-center items-center h-screen'>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log('Login Success:', credentialResponse);
                        localStorage.setItem("user", JSON.stringify(credentialResponse.credential))
                        setAuthUser(credentialResponse)
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    useOneTap
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default GoogleAuthBtn;
