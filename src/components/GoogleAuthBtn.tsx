import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import useAuth from "../zustand/useAuth";

type GoogleAuthUser = {
    sub: string;
    name: string;
    email: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
};

const GoogleAuthBtn = () => {
    const { setAuthUser } = useAuth();
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const handleSuccess = (credentialResponse: any) => {
        if (credentialResponse.credential) {
            const decodedUser = jwtDecode(credentialResponse.credential) as GoogleAuthUser;

            console.log("Decoded User:", decodedUser);
            localStorage.setItem("user", JSON.stringify(decodedUser));
            setAuthUser(decodedUser);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => console.log("Login Failed")}
                    useOneTap
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default GoogleAuthBtn;
