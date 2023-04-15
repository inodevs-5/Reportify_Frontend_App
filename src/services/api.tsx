import { create } from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = create({
    baseURL: 'https://reportify-backend-a322.onrender.com',
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
})

api.addAsyncRequestTransform(request => async() => {
    const token = await AsyncStorage.getItem('@Reportify:token');

    if (token) {
        request.headers['Authorization'] = `Baerer ${token}`;
    }
})

export default api;