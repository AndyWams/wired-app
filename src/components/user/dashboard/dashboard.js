import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfileFetch } from "../../../redux/authAction";
function Dashboaard({ getProfile }) {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <div>
      <h2>Welcome User</h2>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfileFetch()),
});

export default connect(null, mapDispatchToProps)(Dashboaard);
