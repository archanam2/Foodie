import React, { useState } from "react";
import { connect } from "react-redux";
import { setChange } from "../../Redux";
import { useHistory } from "react-router";
import "./Locations.scss";

const Locations = props => {
  const history = useHistory();

  const [megaState, setMegaState] = useState({
    entity_id: props.location.entity_id,
    entity_type: props.location.entity_type,
    title: props.location.title,
    country_name: props.location.country_name,
  });
  // const [entity_id, setEntity_id] = useState(props.location.entity_id);
  // const [entity_type, setEntity_type] = useState(props.location.entity_type);
  // const [title, setTitle] = useState(props.location.title);
  // const [country_name, setCountry_name] = useState(props.location.country_name);

  const handleClick = () => {
    // this.props.onhandleClick(true);
    props.setChange(megaState);
    history.push("/userQueryRestaurants");
  };

  return (
    <button className="locationCard" onClick={handleClick}>
      <a>
        <i className="fa fa-map-marker" aria-hidden="true"></i>
        <b>{megaState.title}</b>
        <br />
        {megaState.title}, {megaState.country_name}
      </a>
    </button>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setChange: state => {
      dispatch(setChange(state));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
