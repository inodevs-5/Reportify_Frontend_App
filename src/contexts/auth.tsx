import { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
    signed: boolean;
    usuario: object | null;
    signIn(email: string, password: string): Promise<void>,
    signOut(): void;
    loading: boolean;
    updateEmail(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const storageUsuario = await AsyncStorage.getItem('@Reportify:usuario');
            const storageToken = await AsyncStorage.getItem('@Reportify:token');

            if (storageUsuario && storageToken) {
                setUsuario(JSON.parse(storageUsuario));
            }
            setLoading(false);
        })()
    }, [])

    async function signIn(email: string, senha: string) {
        const response = await api.post('/login', {
            email, senha
        });

        setUsuario(response.data.usuario);

        await AsyncStorage.setItem('@Reportify:usuario', JSON.stringify(response.data.usuario));
        await AsyncStorage.setItem('@Reportify:token', response.data.token);
    }

    async function updateEmail() {
        if (usuario) {
            const updatedUsuario = {...usuario, email_notificacao: !usuario.email_notificacao}
            await AsyncStorage.setItem('@Reportify:usuario', JSON.stringify(updatedUsuario));
            setUsuario(updatedUsuario)
        }
    }

    async function signOut() {
        await AsyncStorage.clear().then(() => {
            setUsuario(null);
        });
    }

    return (
    <AuthContext.Provider value={{signed: !!usuario, usuario, signIn, signOut, loading, updateEmail}}>
        {children}
    </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
};