import { useState, useEffect } from "react";

import "./index.css";
import { useParams } from "react-router-dom";
import LatestMatch from "../latestmatches";
import MatchCard from "../matchcard";

const matchesResponseObject = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
};

const TeamMatches = () => {
  const [teamMatchesResponse, setTeamMatchesResponse] = useState({
    responseData: {},
    responseStatus: matchesResponseObject.initial,
  });

  const params = useParams();
  const teamId = params.id;

  useEffect(() => {
    getTeamMatchesDetails();
    //eslint-disable-next-line
  }, []);

  const getTeamMatchesDetails = async () => {
    setTeamMatchesResponse((prevState) => ({
      ...prevState,
      responseStatus: matchesResponseObject.inProgress,
    }));

    const teamMatchesUrl = `https://apis.ccbp.in/ipl/${teamId}`;
    const matchesDetailsResponse = await fetch(teamMatchesUrl);
    const matchesJsonData = await matchesDetailsResponse.json();

    if (matchesDetailsResponse.ok) {
      const updatedLatestMatches = {
        competingTeam: matchesJsonData.latest_match_details.competing_team,
        competingTeamLogo:
          matchesJsonData.latest_match_details.competing_team_logo,
        date: matchesJsonData.latest_match_details.date,
        firstInnings: matchesJsonData.latest_match_details.first_innings,
        id: matchesJsonData.latest_match_details.id,
        manOfTheMatch: matchesJsonData.latest_match_details.man_of_the_match,
        matchStatus: matchesJsonData.latest_match_details.match_status,
        result: matchesJsonData.latest_match_details.result,
        secondInnings: matchesJsonData.latest_match_details.second_innings,
        umpires: matchesJsonData.latest_match_details.umpires,
        venue: matchesJsonData.latest_match_details.venue,
      };

      const updatedRecentMatches = matchesJsonData.recent_matches.map(
        (eachItem) => ({
          competingTeam: eachItem.competing_team,
          competingTeamLogo: eachItem.competing_team_logo,
          date: eachItem.date,
          firstInnings: eachItem.first_innings,
          id: eachItem.id,
          manOfTheMatch: eachItem.man_of_the_match,
          matchStatus: eachItem.match_status,
          result: eachItem.result,
          secondInnings: eachItem.second_innings,
          umpires: eachItem.umpires,
          venue: eachItem.venue,
        })
      );

      const updatedResponseData = {
        latestMatchDetails: updatedLatestMatches,
        recentMatches: updatedRecentMatches,
        teamBannerUrl: matchesJsonData.team_banner_url,
      };

      setTeamMatchesResponse((prevState) => ({
        ...prevState,
        responseData: updatedResponseData,
        responseStatus: matchesResponseObject.success,
      }));
    }
  };

  const renderContent = () => {
    return (
      <>
        <div className="row mt-2 mb-4">
          <div className="col-12 text-center">
            <img
              src={teamMatchesResponse.responseData.teamBannerUrl}
              alt={teamId}
              className="team-matches-banner"
            />
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <h2 className="latest-match-main-heading mt-4 mb-3 col-12">
            Latest Matches
          </h2>
          <LatestMatch
            latestMatchData={
              teamMatchesResponse.responseData.latestMatchDetails
            }
            key={teamMatchesResponse.responseData.latestMatchDetails.id}
          />
        </div>
        <div className="row mt-4 mb-3 d-flex align-items-stretch">
          {teamMatchesResponse.responseData.recentMatches.map((eachMatch) => (
            <MatchCard matchDetails={eachMatch} key={eachMatch.id} />
          ))}
        </div>
      </>
    );
  };

  const displayContentOrLoader = () => {
    switch (teamMatchesResponse.responseStatus) {
      case matchesResponseObject.success:
        return renderContent();

      case matchesResponseObject.inProgress:
        return (
          <div className="row">
            <div className="d-flex align-items-center justify-content-center col-12">
              <div
                class="spinner-border text-light matches-spinner"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getTeamMatchesBg = () => {
    switch (teamId) {
      case "RCB":
        return "rcb-bg";
      case "KKR":
        return "kkr-bg";
      case "KXP":
        return "pk-bg";
      case "CSK":
        return "csk-bg";
      case "RR":
        return "rr-bg";
      case "MI":
        return "mi-bg";
      case "SH":
        return "srh-bg";

      default:
        return "dc-bg";
    }
  };

  const teamMatchesBg = getTeamMatchesBg();

  return (
    <div className={`ipl-team-matches-bg ${teamMatchesBg}`}>
      <div className="container mt-3 mb-3">{displayContentOrLoader()}</div>
    </div>
  );
};

export default TeamMatches;
