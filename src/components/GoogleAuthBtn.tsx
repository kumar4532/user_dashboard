import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useAuth from "../zustand/useAuth";

const GoogleAuthBtn = () => {
    const { setAuthUser } = useAuth();

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
