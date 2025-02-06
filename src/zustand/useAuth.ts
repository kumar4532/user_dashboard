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

const useAuth = create<{
    authUser: GoogleAuthUser | null;
    setAuthUser: (authUser: GoogleAuthUser) => void;
}>((set) => ({
    authUser: null,
    setAuthUser: (authUser) => set({ authUser }),
}));

export default useAuth;