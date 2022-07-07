import * as types from "../actionType";
import axios from "axios";

const getCars = (cars) => ({
    type: types.GET_CARS,
    payload: cars,
});

const carDeleted = () => ({
    type: types.DELETE_CAR,
});

const carAdded = () => ({
    type: types.ADD_CAR,
});

const carUpdated = () => ({
    type: types.UPDATE_CAR,
});

const getCar = (car) => ({
    type: types.GET_SINGLE_CAR,
    payload: car,
});

export const loadCars = () => {
    return function (dispatch) {
        console.log(`${process.env.REACT_APP_API}/CarsTable`);
        axios.get(`${process.env.REACT_APP_API}/CarsTable`).then((resp) => {
            console.log("resp", resp);
            dispatch(getCars(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const getByCars = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/CarsTable/getbyuserid/${id}`).then((resp) => {
            console.log("resp", resp);
            dispatch(getCars(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const deleteCar = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/CarsTable/${id}`).then((resp) => {
            console.log("resp", resp);
            dispatch(carDeleted());
            dispatch(loadCars());
        })
        .catch((error) => console.log(error));
    };
};

export const addCar = (car) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}/CarsTable`, car).then((resp) => {
            console.log("resp", resp);
            dispatch(carAdded());
            dispatch(loadCars());
        })
        .catch((error) => console.log(error));
    };
};

export const getSingleCar = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/CarsTable/${id}`).then((resp) => {
            console.log("resp", resp);
            dispatch(getCar(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const updateCar = (car, id) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_API}/CarsTable/${id}`, car).then((resp) => {
            console.log("resp", resp);
            dispatch(carUpdated());
            dispatch(loadCars());
        })
        .catch((error) => console.log(error));
    };
};