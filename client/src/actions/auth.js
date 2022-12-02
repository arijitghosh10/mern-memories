import * as api from '../api/index.js';

export const signin = (fromData,history) => async(dispatch) =>{
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.signin(fromData);
        dispatch({ type:'AUTH', data });
        history('/');
    } catch (error) {
        dispatch({ type: 'END_LOADING' });
        console.log(error);
        dispatch({ type:'AUTH_ERROR',data:error.response?.data?.message });
    }
}
export const signup = (fromData,history) => async(dispatch) =>{
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.signup(fromData);
        dispatch({ type:'AUTH', data });
        history('/')
    } catch (error) {
        dispatch({ type: 'END_LOADING' });
        console.log(error);
        dispatch({ type:'AUTH_ERROR',data:error.response?.data?.message });
    }
}