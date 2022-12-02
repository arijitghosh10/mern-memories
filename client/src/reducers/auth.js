export default (state= { authData:null,loading:false },action) =>{
    switch (action.type) {
        case 'START_LOADING':
            return {...state, loading:true};
        case 'END_LOADING':
            return {...state, loading:false};
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state,authData:action?.data,loading:false,errors:null };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state,authData:null,loading:false,errors:null };
        case 'AUTH_ERROR':
            return {...state,errors:action?.data };
        default:
            return state;
    }
};
