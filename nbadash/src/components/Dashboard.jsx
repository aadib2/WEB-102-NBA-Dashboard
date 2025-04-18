import React from 'react'
import { useState } from 'react'
import {useEffect} from 'react'

import { nbaTeamEmojis } from '../teamEmojis'


const Dashboard = ({ gamesStats }) => {
    const [input, setInput] = useState("")
    const [category, setCategory] = useState("All");
    const [filteredGames, setFilteredGames] = useState([]);

    // Initialize filteredGames with all games when the component mounts
    useEffect(() => {
        setFilteredGames(gamesStats);
    }, [gamesStats]);

    const handleInput = (e) => {
        setInput(e.target.value.toLowerCase());

        // after setting input, filter games based on the team input
        setFilteredGames(gamesStats.filter((game) => {
            const homeTeam = game.home_team.full_name.toLowerCase();
            const visitorTeam = game.visitor_team.full_name.toLowerCase();
            return homeTeam.includes(input) || visitorTeam.includes(input);
        }));
    }
    const handleCategory = (e) => setCategory(e.target.value);

    const filterByConference = () => {
            setFilteredGames(gamesStats.filter((game) => {
                const homeConf = game.home_team.conference;
                const awayConf = game.visitor_team.conference;
                // if category is all, just keep all original games in list
                if(category == "All") {
                    return true;
                // if category is interconference
                } else if(category == "Interconference") {
                    return (homeConf != awayConf);
                }
                // if category is east or west
                else {
                    return (category == homeConf) && (category == awayConf);
                }
            }));
    }


    return (
        <div className="dashboard-container">
            <h2> ⚡ Latest NBA Games ⛹🏼‍♂️ </h2>
            <div className="search-filter-container">
                <h3> Filter by Team: </h3>
                <input type="text" value={input} placeholder="Enter team name" onChange={handleInput} />
                <h3> Filter by Conference: </h3>
                <select onChange={handleCategory}>
                    <option value = "All"> All</option>
                    <option value="East"> East</option>
                    <option value="West"> West </option>
                    <option value = "Interconference"> Interconference</option>
                </select>
                {/* still have to implement functionality*/}
                <button onClick={filterByConference}> Search </button>
            </div>
            
            <div className="stats-container">
                <table className="game-stats-table">
                    <thead>
                        <tr>
                            <th> Date </th>
                            <th> Home Team</th>
                            <th> Visitor Team</th>
                            <th> Final Score </th>
                            <th> Game Status</th>
                            <th> Season</th>
                            <th> Period</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGames.map((game, index) => (
                            <tr key={index}>
                                <td> {game.date} </td>
                                <td> {game.home_team.full_name} {nbaTeamEmojis[game.home_team.abbreviation]}</td>
                                <td> {game.visitor_team.full_name} {nbaTeamEmojis[game.visitor_team.abbreviation]}</td>
                                <td> {game.home_team_score} - {game.visitor_team_score} </td>
                                <td> {game.status} </td>
                                <td> {game.season} </td>
                                <td> {game.period} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
