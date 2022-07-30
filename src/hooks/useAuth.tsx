import { isValid } from '@utils/constants';
import { User } from 'firebase/auth';
import { onSnapshot, query } from 'firebase/firestore';
import { useContext, useState, useEffect, ReactNode, createContext, useReducer } from 'react';
import { auth, database } from '../utils/firebase';

const defaultGoogle: Google = {
    displayName: '',
    email: '',
    photoURL: null
};

const defaultUser: UserData = {
    userId: null,
    google: defaultGoogle
};

export const AuthContext = createContext<User | null>(null);

export function useAuth(): [User | null, Required<Payload>] {
    const currentUser = useContext(AuthContext);

    const [state, dispatch] = useReducer(reducer, {
        user: defaultUser,
        users: []
    });

    useEffect(() => {
        const u = state.users?.find(u => u.userId === currentUser?.uid);

        if (!u) {
            dispatch({
                type: Actions.SetUser,
                payload: { user: { userId: null, google: defaultGoogle } }
            });
            return;
        }

        dispatch({
            type: Actions.SetUser,
            payload: { user: u }
        });
    }, [currentUser?.uid, state.users]);

    useEffect(() => {
        const q = query(database.users);

        return onSnapshot(q, {
            next: snapshot => {
                dispatch({
                    type: Actions.SetUsers,
                    payload: {
                        users: snapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() } as UserData))
                    }
                });
            }
        });
    }, []);

    return [isValid(currentUser) ? currentUser : null, state as Required<Payload>];
}

function reducer(state: Payload, { type, payload }: { type: Actions; payload: Payload }) {
    switch (type) {
        case Actions.SetUsers:
            return {
                ...state,
                ...{ users: payload.users }
            };
        case Actions.SetUser:
            return {
                ...state,
                ...{ user: payload.user }
            };
        default: {
            return state;
        }
    }
}

const enum Actions {
    SetUser = 'setUser',
    SetUsers = 'setUsers'
}

interface Payload {
    user?: UserData;
    users?: UserData[];
}

export interface UserData {
    userId: string | null;
    google: Google;
}

interface Google {
    displayName: string;
    email: string;
    photoURL: string | null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
    }, []);

    return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
}
