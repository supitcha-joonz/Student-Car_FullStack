import {combineReducers} from "redux";
import usersReducers from "../redux/reducer/reducer";
import carsReducers from "../redux/reducer/reducerCar";
import dropdownsReducers from "./reducer/reducerDropdown";

const rootReducer = combineReducers({
    users: usersReducers,
    cars: carsReducers,
    dropdowns: dropdownsReducers,
});

export default rootReducer;