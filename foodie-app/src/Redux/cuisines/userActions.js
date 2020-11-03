import axios from 'axios'
import {
  FETCH_REQUEST,
  FETCH_CUISINES_SUCCESS,
  FETCH_FAILURE,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTUARANTS,
  FETCH_CUISINES,
  FETCH_PLACES,
  FETCH_RESTUARANT_DATA,
  FETCH_RESTUARANT_DATA_SUCCESS,
  FETCH_DAILY_MENU,
  FETCH_DAILY_MENU_SUCCESS,
  SET_SEARCH,
  SET_CHANGE
} from './userTypes'

// const headers = {
//   'Content-Type': 'application/json',
//   'user-key': '0997dc3e6fb7b32390fe637998593e5b',
// }

// export const fetchPlaces= (url) => {
//   console.log("fetchPlaces:",url);
//   return (dispatch) => {
//     dispatch(fetchRequest())
//     axios
//       .get(url,{headers:headers})
//       .then(response => {
//         // response.data is the users
//         const places = response.data.location_suggestions
//         dispatch(setSearch(places))
//       })
//       .catch(error => {
//         // error.message is the error message
//         dispatch(fetchFailure("Fetch Places Error: "+error.message))
//       })
//   }
// }

// export const fetchCuisines= (url) => {
//   console.log("fetchCuisines: ",url);
//   return (dispatch) => {
//     dispatch(fetchRequest())
//     axios
//       .get(url,{headers:headers})
//       .then(response => {
//         // response.data is the users
//         const users = response.data.cuisines
//         dispatch(fetchCuisinesSuccess(users))
//       })
//       .catch(error => {
//         // error.message is the error message
//         dispatch(fetchFailure("Fetch Cuisines Error: "+error.message))
//       })
//   }
// }

// export const fetchRestaurants= (url) => {
//   console.log("fetchRestaurants: ",url);
//   return (dispatch) => {
//     dispatch(fetchRequest())
//     axios
//       .get(url,{headers:headers})
//       .then(response => {
//         // response.data is the users
//         const restaurants = response.data.restaurants.filter(restaurants1 => restaurants1.restaurant.featured_image !== "" )
//         // let data=restaurants.
//         dispatch(fetchRestaurantSuccess(restaurants))
//       })
//       .catch(error => {
//         // error.message is the error message
//         dispatch(fetchFailure("Fetch Restaurant Error: "+error.message))
//       })
//   }
// }

export const fetchPlaces = (url) =>{
  return {
  type: FETCH_PLACES,
  payload:url
  }
}

export const fetchCuisines = (url) =>{
  return {
  type: FETCH_CUISINES,
  payload:url
  }
}

export const fetchRestaurants = (url) =>{
  return {
  type: FETCH_RESTUARANTS,
  payload:url
  }
}

export const fetchRestaurantData = (id) =>{
  return{
    type: FETCH_RESTUARANT_DATA,
    payload:id
  }
}

export const fetchDailyMenu = (id) =>{
  return{
    type: FETCH_DAILY_MENU,
    payload:id
  }
}

export const setSearch = (state) => {
  return {
    type: SET_SEARCH,
    payload: state
  }
}

export const setChange = (state) => {
  return {
    type: SET_CHANGE,
    payload: state
  }
}

export const fetchRequest = () => {
  return {
    type: FETCH_REQUEST
  }
}

export const fetchCuisinesSuccess = cuisines => {
  return {
    type: FETCH_CUISINES_SUCCESS,
    payload: cuisines
  }
}

export const fetchRestaurantSuccess = restaurants => {
  return {
    type: FETCH_RESTAURANTS_SUCCESS,
    payload: restaurants
  }
}

export const fetchRestaurantHomeSuccess = restaurant => {
  return {
    type: FETCH_RESTUARANT_DATA_SUCCESS,
    payload: restaurant
  }
}

export const fetchDailyMenuSuccess = Menu => {
  return {
    type: FETCH_DAILY_MENU_SUCCESS,
    payload: Menu
  }
}

export const fetchFailure = error => {
  return {
    type: FETCH_FAILURE,
    payload: error
  }
}
