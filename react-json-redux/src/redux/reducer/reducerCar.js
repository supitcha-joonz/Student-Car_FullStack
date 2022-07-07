import * as types from "../actionType";


const initialState = {
    cars: [],
    car: {},
    loading: true,
};

const carsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CARS:
            return {
                ...state,
                cars: action.payload,
                loading: false,
            };
        case types.DELETE_CAR:
        case types.ADD_CAR:
        case types.UPDATE_CAR:
            return {
                ...state,
                loading: false,
            };
        case types.GET_SINGLE_CAR:
            return {
                ...state,
                car: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default carsReducers;