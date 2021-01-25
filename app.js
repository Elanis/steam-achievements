import fetch from 'node-fetch';
import fs from 'fs';

// CONFIG
const API_KEY = '';
const STEAM_ID = '';

// Get Data
async function GetPlayerSummaries() {
	const result = await fetch('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + API_KEY + '&steamids=' + STEAM_ID);
	const jsonRes = await result.json();

	return jsonRes.response.players[0];
}

async function GetAchievements(appId) {
	const result = await fetch('http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=' + appId + '&key=' + API_KEY + '&steamid=' + STEAM_ID);
	const jsonRes = await result.json();

	//console.log(jsonRes);

	return jsonRes;
}

async function GetPlayerGames() {
	const result = await fetch('https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + API_KEY + '&steamid=' + STEAM_ID + '&format=json&include_appinfo=1&include_played_free_games=1');
	const jsonRes = (await result.json()).response;

	for(const gameId in jsonRes.games) {
		jsonRes.games[gameId].playerstats = (await GetAchievements(jsonRes.games[gameId].appid)).playerstats || {};
		//console.log(jsonRes.games[gameId].playerstat);
	}

	return jsonRes;
}

(async function() {
	const ply = await GetPlayerSummaries();
	console.log(ply);

	const games = await GetPlayerGames();
	console.log(games);

	fs.writeFileSync('games.json', JSON.stringify(games));
})();