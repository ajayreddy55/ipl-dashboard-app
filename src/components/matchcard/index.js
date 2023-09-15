import "./index.css";

const MatchCard = (props) => {
  const { matchDetails } = props;
  const { competingTeam, competingTeamLogo, matchStatus, result } =
    matchDetails;

  const statusTextColor = matchStatus === "Won" ? "won-color" : "lost-color";

  return (
    <div className="col-12 col-md-6 col-lg-4 mt-3 mb-3 d-flex align-items-stretch">
      <div className="match-card">
        <img
          src={competingTeamLogo}
          alt={competingTeam}
          className="match-card-logo"
        />
        <h3 className="match-card-team-name">{competingTeam}</h3>
        <p className="match-card-result">{result}</p>
        <p className={`match-card-status ${statusTextColor}`}>{matchStatus}</p>
      </div>
    </div>
  );
};

export default MatchCard;
