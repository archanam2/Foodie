import React, { useEffect, useState } from "react";
import FoodCard from "../FoodCard/Foodcards";
import FilterSidebar from "../Sidebar/FilterSidebar/FilterSideBar";
import "./AllRestaurants.scss";
import { connect } from "react-redux";
import {
  fetchRestaurants,
  fetchRestaurantData,
  fetchDailyMenu,
} from "../../Redux";
import { useHistory } from "react-router";

function AllRestaurants({
  userData,
  fetchRestaurants,
  fetchRestaurantData,
  fetchDailyMenu,
}) {
  const [url, setUrl] = useState(
    `https://developers.zomato.com/api/v2.1/search?entity_id=${userData.entityId}&entity_type=${userData.entityType}&sort=rating&order=asc`
  );
  const history = useHistory();

  useEffect(() => {
    // setUrl(qurl)
    // setTimeout(() => {
    //   fetchRestaurants(qurl)
    // }, 3000)
    fetchRestaurants(url);
  }, []);

  const other = [
    "Veg",
    "Non_Veg",
    "Popularity_high_to_low",
    "Rating_high_to_low",
    "Cost_high_to_low",
    "Cost_low_to_high",
  ];
  const preference1 = ["Veg", "Non_Veg"];
  const sortFilter = other.slice(2);

  const onFilter = filters => {
    console.log("filterBoxes: ", filters);
    let sort = Object.keys(filters)
      .filter(key => sortFilter.includes(key))
      .reduce((obj, key) => {
        obj[key] = filters[key];
        return Object.values(obj);
      }, []);

    let preference = Object.keys(filters)
      .filter(key => preference1.includes(key))
      .reduce((obj, key) => {
        obj[key] = filters[key];
        return Object.values(obj);
      }, []);

    let cuisines = Object.keys(filters)
      .filter(key => !other.includes(key))
      .reduce((obj, key) => {
        obj[key] = filters[key];
        return Object.values(obj);
      }, []);
    console.log("cuisines: ", cuisines);
    const qurl = `https://developers.zomato.com/api/v2.1/search?entity_id=${
      userData.entityId
    }&entity_type=${userData.entityType}&cuisines=${cuisines.join()}&${
      sort !== [] ? sort[0] : "sort=rating&order=desc"
    }&q=${preference.join()}`;
    console.log("qurl: ", qurl);
    fetchRestaurants(qurl);
  };

  const handleHeaderFilter = e => {
    let filter = e.target.textContent;
    if (filter === "Cost For Two") {
      filter = "cost";
    }
    const qurl = `https://developers.zomato.com/api/v2.1/search?entity_id=${
      userData.entityId
    }&${filter === "Relevance" ? "q=Relevance" : "sort=" + filter}&order=desc`;
    console.log("qurl: ", qurl);
    fetchRestaurants(qurl);
  };

  const handleClick = id => {
    console.log("id: ", id);
    fetchRestaurantData(id);
    fetchDailyMenu(id);
    history.push("/RestaurantHome");
  };

  return (
    <div className="main">
      <FilterSidebar onFilters={onFilter} />
      <div className="filterhead">
        {/* <button
          // onClick={() => toggleMenu()}
          className="toggle-menu"
          // style={{
          //   transform: `translate(${width}px)`
          // }}
        >
          <i class="fa fa-sliders" aria-hidden="true"></i>
        </button> */}
        <div className="span1">
          <button onClick={handleHeaderFilter}>Relevance</button>
          <button onClick={handleHeaderFilter}>Cost For Two</button>
          <button onClick={handleHeaderFilter}>Rating</button>
        </div>
        <span>
          <b className={"topPick"}>Top Pick</b>
        </span>
      </div>
      <hr />
      <div className="foodCards">
        {userData &&
          userData.restaurants &&
          userData.restaurants.map(data => (
            <FoodCard key={data.id} recipe={data} handleClick={handleClick} />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurants: url => dispatch(fetchRestaurants(url)),
    fetchRestaurantData: id => dispatch(fetchRestaurantData(id)),
    fetchDailyMenu: id => dispatch(fetchDailyMenu(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllRestaurants);
