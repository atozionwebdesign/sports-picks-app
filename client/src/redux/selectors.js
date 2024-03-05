export const currentWeekSelector = (state) => {
    return state.api.week;
}

export const teamsSelector = (state) => {
    return state.api.teams;
}

export const teamsDivisionsSelector = (state) => {
    return state.team.teams
}

export const standingsSelector = (state) => {
    return state.api.standings;
}

export const loggedInSelector = (state) => {
    return state.user.loggedIn;
}

export const userSelector = (state) => {
    return state.user.user;
}

export const winnersSelector = (state) => {
    return state.api.winners;
}

export const picksSelector = (state) => {
    return state.pick.picks;
}

export const userPicksSelector = (state) => {
    return state.pick.userPicks;
}

export const gamesSelector = (state) => {
    return state.api.games;
}

export const leagueSelector = (state) => {
    return state.api.leagueInfo;
}

export const allGamesSelector = (state) => {

    return state.api.allGames;
}