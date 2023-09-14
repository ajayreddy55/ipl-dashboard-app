import "./index.css";

import { Link } from "react-router-dom";

const TeamCard = (props) => {
  const { teamDetails } = props;
  const { id, name, teamImageUrl } = teamDetails;

  return (
    <div className="col-12 col-md-6 mt-3 mb-3 d-flex align-items-stretch justify-content-center">
      <Link to={`/team-matches/${id}`} className="ipl-team-card-item">
        <img src={teamImageUrl} alt={name} className="ipl-team-card-image" />
        <h3 className="ipl-team-card-name">{name}</h3>
      </Link>
    </div>
  );
};

export default TeamCard;
