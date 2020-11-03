import {
  FETCH_REQUEST,
  FETCH_CUISINES_SUCCESS,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTUARANT_DATA_SUCCESS,
  FETCH_DAILY_MENU_SUCCESS,
  FETCH_FAILURE,
  SET_SEARCH,
  SET_CHANGE
} from './userTypes'

const initialState = {
  loading: false,
  searchAction:false,
  entityId:5,
  entityType:"city",
  locationTitle:"",
  country:"India",
  cuisines: [],
  restaurants:[],
  places:[],
  restaurantData:[],
  dailyMenu:[],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SET_SEARCH:
      return {
        ...state,
        searchAction:true,
        // entityId:action.payload.entity_id,
        // entityType:action.payload.entity_type,
        // locationTitle:action.payload.title,
        // country:action.payload.country_name,
        places:action.payload
      }
    case SET_CHANGE:
      return {
        ...state,
        // searchAction:true,
        entityId:action.payload.entity_id,
        entityType:action.payload.entity_type,
        locationTitle:action.payload.title,
        country:action.payload.country_name,
        // places:action.payload
      }
    case FETCH_CUISINES_SUCCESS:
      return {
        ...state,
        searchAction:false,
        loading: false,
        cuisines: action.payload,
        error: ''
      }
    case FETCH_RESTAURANTS_SUCCESS:
      return {
        ...state,
        searchAction:false,
        loading: false,
        restaurants: action.payload,
        error: ''
      }
    case FETCH_RESTUARANT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantData: action.payload,
        error: ''
      }
    case FETCH_DAILY_MENU_SUCCESS:
      return {
      ...state,
      loading: false,
      dailyMenu: action.payload,
      error: ''
    }
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        cuisines: [],
        error: action.payload
      }
    default: return state
  }
}

export default reducer
