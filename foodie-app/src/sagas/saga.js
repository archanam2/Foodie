import { takeLatest, put, call, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_PLACES,
  FETCH_CUISINES,
  FETCH_RESTUARANTS,
  FETCH_RESTUARANT_DATA,
  FETCH_DAILY_MENU,
} from "../Redux/cuisines/userTypes";

import * as actions from "../Redux/cuisines/userActions";

export function* watchActionsSaga() {
  yield takeLatest(FETCH_PLACES, fetchPlacesData);
  yield takeLatest(FETCH_CUISINES, fetchCuisinesData);
  yield takeLatest(FETCH_RESTUARANTS, fetchRestaurantsData);
  yield takeLatest(FETCH_RESTUARANT_DATA, fetchRestaurantHomeData);
  yield takeLatest(FETCH_DAILY_MENU, fetchDailyMenuData);
}

const headers = {
  "Content-Type": "application/json",
  "user-key": "0997dc3e6fb7b32390fe637998593e5b",
};

function* fetchPlacesData(action) {
  const url = action.payload;
  console.log("fetchPlaces:", url);
  yield put(actions.fetchRequest());
  try {
    const response = yield call(() => axios.get(url, { headers: headers }));
    const places = response.data.location_suggestions;
    yield put(actions.setSearch(places));
  } catch (error) {
    yield put(actions.fetchFailure("Fetch Places Error: " + error.message));
  }
}

function* fetchCuisinesData(action) {
  const url = action.payload;
  console.log("fetchCuisines: ", url);
  yield put(actions.fetchRequest());
  try {
    const response = yield call(() => axios.get(url, { headers: headers }));
    const cuisines = response.data.cuisines;
    yield put(actions.fetchCuisinesSuccess(cuisines));
  } catch (error) {
    yield put(actions.fetchFailure("Fetch Cuisines Error: " + error.message));
  }
}

function* fetchRestaurantsData(action) {
  const url = action.payload;
  console.log("fetchCuisines: ", url);
  yield put(actions.fetchRequest());
  try {
    const response = yield call(() => axios.get(url, { headers: headers }));
    const restaurants = response.data.restaurants.filter(
      restaurants1 => restaurants1.restaurant.featured_image !== ""
    );
    yield put(actions.fetchRestaurantSuccess(restaurants));
  } catch (error) {
    yield put(actions.fetchFailure("Fetch Restaurant Error: " + error.message));
  }
}

function* fetchRestaurantHomeData(action) {
  const id = action.payload;
  const url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`;
  console.log("fetchPlaces:", url);
  yield put(actions.fetchRequest());
  try {
    const response = yield call(() => axios.get(url, { headers: headers }));
    const restaurant = response.data;
    yield put(actions.fetchRestaurantHomeSuccess(restaurant));
  } catch (error) {
    yield put(actions.fetchFailure("Fetch Places Error: " + error.message));
  }
}

function* fetchDailyMenuData(action) {
  const id = action.payload;
  const url = `https://developers.zomato.com/api/v2.1/dailymenu?res_id=${id}`;
  console.log("fetchPlaces:", url);
  yield put(actions.fetchRequest());
  try {
    const response = yield call(() => axios.get(url, { headers: headers }));
    const menu = response.data.daily_menu.dishes;
    yield put(actions.fetchDailyMenuSuccess(menu));
  } catch (error) {
    yield put(actions.fetchFailure("Fetch Places Error: " + error.message));
  }
}
