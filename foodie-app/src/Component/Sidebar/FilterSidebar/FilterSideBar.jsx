import "./FilterSidebar.scss";
import Sidebar from "../Sidebar";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchCuisines } from "../../../Redux";

function FilterSideBar({ userData, fetchCuisines, onFilters }) {
  const [search, setSearch] = useState("");
  const [filterCheckBoxes, setFilterCheckBoxes] = useState();
  // const [filterCheck,setFilterCheck] = useState();

  const url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${userData.entityId}`;

  const Preference = [
    { id: 1, name: "Veg", value: "veg", isChecked: false },
    { id: 2, name: "Non-Veg", value: "nonveg", isChecked: false },
  ];
  const sort = [
    {
      id: 3,
      name: "Popularity - high to low",
      value: "Popularity",
      isChecked: false,
    },
    {
      id: 4,
      name: "Rating - high to low",
      value: "sort=rating&amp;order=desc",
      isChecked: false,
    },
    {
      id: 5,
      name: "Cost-high to low",
      value: "sort=cost&amp;order=desc",
      isChecked: false,
    },
    {
      id: 6,
      name: "Cost-low to high",
      value: "sort=cost&amp;order=asc",
      isChecked: false,
    },
  ];

  useEffect(() => {
    fetchCuisines(url);
  }, []);

  // const cuisines=[ userData.cuisines !==[] &&  userData.cuisines.filter(data => {
  //   return ({id: data.cuisine.cuisine_id, name:data.cuisine.cuisine_name, value: data.cuisine.cuisine_id, isChecked: false})
  // })]

  const filteredCuisines = userData.cuisines.filter(data => {
    return (
      data.cuisine.cuisine_name.toLowerCase().indexOf(search.toLowerCase()) !==
      -1
    );
  });

  const onChange = e => {
    setSearch(e.target.value);
  };

  const onFilterChange = e => {
    const name = e.target.name;
    const id = e.target.value;
    let updatedFilterbox = Object.assign({}, filterCheckBoxes, { [name]: id });
    setFilterCheckBoxes(updatedFilterbox);
  };

  const handleAllChecked = () => {
    // filterCheckBoxes.forEach(filter => filter.isChecked = false)
  };

  const onSubmit = e => {
    onFilters(filterCheckBoxes);
  };

  return (
    <Sidebar width={300} height={"100vh"}>
      <p className={"p"}>Preference</p>
      <ul className="ul">
        {Preference.map(data => (
          <li key={data.id}>
            <input
              style={{ cursor: "pointer" }}
              className={"inputs"}
              type="checkbox"
              name={data.name}
              value={data.value}
              onChange={onFilterChange}
              checked={data.isChecked}
            />
            {data.name}
          </li>
        ))}
      </ul>
      <p className="p">Cuisines</p>
      <input
        className="filter inputs"
        type="text"
        name="query"
        onChange={onChange}
        value={search}
        // autoComplete="off"
        placeholder="Search Cuisines"
      />
      <ul className="cuisines">
        {/* {cuisines.map(data => 
        <li key={data.id}>
          <input type="checkbox" name={data.name} value={data.value} onChange={onFilterChange} checked={data.isChecked}/>
          {data.name}
          </li>
        )} */}

        {userData.cuisines !== [] &&
          filteredCuisines.map(data => (
            <li key={data.cuisine.cuisine_id}>
              <input
                className={"inputs"}
                type="checkbox"
                style={{ cursor: "pointer" }}
                name={data.cuisine.cuisine_name}
                value={data.cuisine.cuisine_id}
                onChange={onFilterChange}
              />
              {data.cuisine.cuisine_name}
            </li>
          ))}
      </ul>
      <p className={"p"}>Sort By</p>
      <ul className="ul">
        {sort.map(data => (
          <li key={data.id}>
            <input
              className={"inputs"}
              type="checkbox"
              style={{ cursor: "pointer" }}
              name={data.name}
              value={data.value}
              onChange={onFilterChange}
              checked={data.isChecked}
            />
            {data.name}
          </li>
        ))}
      </ul>
      <div className="filterBottom">
        <button className="btn btn-primary" onClick={handleAllChecked}>
          Clear
        </button>
        <button className="btn btn-primary" onClick={onSubmit}>
          Apply
        </button>
      </div>
    </Sidebar>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCuisines: url => dispatch(fetchCuisines(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSideBar);
