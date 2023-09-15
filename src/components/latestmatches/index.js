import "./index.css";

const LatestMatch = (props) => {
  const { latestMatchData } = props;

  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    result,
    secondInnings,
    umpires,
    venue,
  } = latestMatchData;

  return (
    <div className="col-12 latest-match-main-card">
      <div className="latest-match-venue-card">
        <div>
          <h3 className="latest-match-opponent-team-name">{competingTeam}</h3>
          <p className="latest-match-date">{date}</p>
          <p className="latest-match-venue">{venue}</p>
          <p className="latest-match-won-by">{result}</p>
        </div>
        <div>
          <img
            src={competingTeamLogo}
            alt={competingTeam}
            className="latest-match-team-logo"
          />
        </div>
      </div>
      <div className="latest-match-team-innings-card">
        <div className="latest-match-innings-container">
          <h5 className="latest-match-innings-heading">First Innings</h5>
          <p className="latest-match-innings-text">{firstInnings}</p>
        </div>
        <div className="latest-match-innings-container">
          <h5 className="latest-match-innings-heading">Second Innings</h5>
          <p className="latest-match-innings-text">{secondInnings}</p>
        </div>
        <div className="latest-match-innings-container">
          <h5 className="latest-match-innings-heading">Man of the Match</h5>
          <p className="latest-match-innings-text">{manOfTheMatch}</p>
        </div>
        <div className="latest-match-innings-container">
          <h5 className="latest-match-innings-heading">Umpires</h5>
          <p className="latest-match-innings-text">{umpires}</p>
        </div>
      </div>
    </div>
  );
};

export default LatestMatch;
