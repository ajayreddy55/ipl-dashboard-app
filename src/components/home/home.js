import "./home.css";
import TeamCard from "../teamcard";
import { useEffect, useState } from "react";

const responseStatusList = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
};

const IplDashboardApp = () => {
  const [responseObject, setResponseObject] = useState({
    teamsList: [],
    responseStatus: responseStatusList.initial,
  });

  useEffect(() => {
    getTeamsDataList();
  }, []);

  const getTeamsDataList = async () => {
    setResponseObject((prevObject) => ({
      ...prevObject,
      responseStatus: responseStatusList.inProgress,
    }));

    let teamsUrl = "https://apis.ccbp.in/ipl";
    let teamsResponse = await fetch(teamsUrl);
    let teamsJsonData = await teamsResponse.json();

    if (teamsResponse.ok) {
      const updatedData = teamsJsonData.teams.map((eachItem) => ({
        id: eachItem.id,
        name: eachItem.name,
        teamImageUrl: eachItem.team_image_url,
      }));
      setResponseObject((prevObject) => ({
        ...prevObject,
        teamsList: updatedData,
        responseStatus: responseStatusList.success,
      }));
    }
  };

  const displayTeamCards = () => {
    return (
      <div className="row mt-4 d-flex align-items-stretch justify-content-center">
        {responseObject.teamsList.map((eachTeam) => (
          <TeamCard teamDetails={eachTeam} key={eachTeam.id} />
        ))}
      </div>
    );
  };

  const displayTeamCardsOrLoader = () => {
    switch (responseObject.responseStatus) {
      case responseStatusList.inProgress:
        return (
          <div className="row mt-5">
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div
                className="spinner-border text-light ipl-teams-card-spinner"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        );

      case responseStatusList.success:
        return displayTeamCards();

      default:
        return null;
    }
  };

  return (
    <div className="ipl-bg-container">
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4 mb-4 d-flex align-items-center justify-content-center">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-logo-heading">IPL Dashboard</h1>
          </div>
        </div>
        {displayTeamCardsOrLoader()}
      </div>
    </div>
  );
};

export default IplDashboardApp;
