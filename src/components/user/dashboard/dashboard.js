import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProfileFetch, logoutUser } from "../../../redux/authAction";
function Dashboaard({ getProfile, logOutUser }) {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("user");
    // Remove the user object from the Redux store
    logOutUser();
    history.push("/");
  };
  return (
    <div>
      <h2>Welcome User</h2>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfileFetch()),
  logOutUser: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatchToProps)(Dashboaard);
