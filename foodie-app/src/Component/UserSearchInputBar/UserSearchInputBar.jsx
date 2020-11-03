import Style from "./UserSearchInputBar.module.scss";
import PlacesAutocomplete from "react-places-autocomplete";
import React, { Component } from "react";
import userQuery from "../../Redux/Actions/ActionsCreator/UserSearchActionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class UserSearchInputBar extends Component {
  state = {
    location_query: "",
    restaurant_query: "",
  };

  // constructor(props) {
  //   super(props);
  //   this.state = { address: "" };
  // }

  // handleChange = address => {
  //   this.setState({ address });
  // };

  render() {
    const {
      type,
      placeholder,
      name,
      userQuery,
      history,
      getRestaurantDetails,
    } = this.props;
    const { location_query, restaurant_query } = this.state;
    return (
      <div className={Style.handleForm}>
        <form
          className={Style.UserResponse}
          onSubmit={e => {
            e.preventDefault();
            userQuery(location_query, restaurant_query);
            history.push("/userQueryRestaurants");
          }}
        >
          <input
            onChange={e => {
              e.target.name == "locationSearch"
                ? this.setState({ location_query: e.target.value })
                : this.setState({ restaurant_query: e.target.value });
            }}
            type={type}
            placeholder={placeholder}
            required
            name={name}
          />
          <button type="sumbit">
            <i
              style={{ fontSize: "18px" }}
              className="fas fa-search-location"
            ></i>
          </button>
        </form>
      </div>

      //   <PlacesAutocomplete
      //     value={this.state.address}`
      //     onChange={this.handleChange}
      //     onSelect={this.handleSelect}
      //   >
      //     {({
      //       getInputProps,
      //       suggestions,
      //       getSuggestionItemProps,
      //       loading,
      //     }) => (
      //       <div>
      //         <input
      //           {...getInputProps({
      //             placeholder: "Search Places ...",
      //             className: "location-search-input",
      //           })}
      //         />
      //         <div className="autocomplete-dropdown-container">
      //           {loading && <div>Loading...</div>}
      //           {suggestions.map(suggestion => {
      //             const className = suggestion.active
      //               ? "suggestion-item--active"
      //               : "suggestion-item";
      //             // inline style for demonstration purpose
      //             const style = suggestion.active
      //               ? { backgroundColor: "#fafafa", cursor: "pointer" }
      //               : { backgroundColor: "#ffffff", cursor: "pointer" };
      //             return (
      //               <div
      //                 {...getSuggestionItemProps(suggestion, {
      //                   className,
      //                   style,
      //                 })}
      //               >
      //                 <span>{suggestion.description}</span>
      //               </div>
      //             );
      //           })}
      //         </div>
      //       </div>
      //     )}
      //   </PlacesAutocomplete>
      // </div>
    );
  }
}
let mapDispatchToprops = dispatch => {
  return {
    userQuery: (locationquery, restaurantquery) =>
      dispatch(userQuery(locationquery, restaurantquery)),
  };
};
export default withRouter(
  connect(null, mapDispatchToprops)(UserSearchInputBar)
);
