const types = {
    login: 'login',
    logout: 'logout',
    increase: 'increase',
    decrease: 'decrease',
    remove: 'remove'
}

const initialStore = {
    user: '',
    id: 0,
    cart: []
}

const StoreReducer = (state, action) => {
    switch (action.type) {
        case types.login:
            const { name, uid } = action.payload;
            return {
                ...state,
                user: name,                
                id: uid
            }
        
        case types.logout:
            return null

        case types.increase:
            const { productId } = action.payload;
            const item = state?.cart.length && state.cart.find(item => item.id === productId );
            const amount = item?.amount || 0;
            if(amount === 0) return {...state, cart: [...state.cart, {id: productId, amount: 1}]};
            return { 
                ...state, 
                cart: state.cart.map(
                    (item) => item.id === productId ? 
                    {
                        ...item, 
                        amount: item.amount + 1
                    } : 
                    item)             
            };

        case types.decrease:
            const { productId:id } = action.payload;
            const { amount:am = 0 } = state?.cart?.find(item => item.id === id );
            if(am === 1) return {...state, cart: state.cart.filter(item => item.id !== id)}
            return { 
                ...state, 
                cart: state.cart.map(
                    (item) => item.id === id ? 
                    {
                        ...item, 
                        amount: item.amount - 1
                    } : 
                    item)             
            };
        
        case types.remove:
            const { productId:idToRemove } = action.payload;
            return {...state, cart: state.cart.filter(item => item.id !== idToRemove)}

        case types.clean:
            return {...state, cart: []}
        default:
            break;
    }
}

export { StoreReducer, initialStore, types }