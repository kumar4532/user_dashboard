import { create } from 'zustand'

type GoogleAuthUser = {
    sub: string;
    name: string;
    email: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
};

const useAuth = create((set) => ({
    authUser: null as GoogleAuthUser | null,
    setAuthUser: (authUser: GoogleAuthUser) => set({ authUser })
}))

export default useAuth;