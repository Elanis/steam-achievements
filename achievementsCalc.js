import fs from 'fs';

const games = JSON.parse(fs.readFileSync('./games.json'));

let playTime = 0;
let gamesWithAchievements = 0;

let playedGames = 0;
let playedGamesWithAchievements = 0;
let playedGamesAchievementCount = 0;
let playedGamesAchievementMax = 0;

let gamesWithAtLeast1 = 0;
let gamesWithAtLeast1AchievementMax = 0;

let gamesAchievementMax = 0;

let avgOfAvgTotal = 0;
let avgOfAvgPlayed = 0;
let avgOfAvg1Unlocked = 0;

for(const game of games.games) {
	playTime += game.playtime_forever;

	if(game.playtime_forever > 0) {
		playedGames++;
	}

	if(typeof game.playerstats.achievements !== 'undefined') {
		gamesWithAchievements++;

		gamesAchievementMax += game.playerstats.achievements.length;

		if(game.playtime_forever > 0) {
			playedGamesWithAchievements++;

			const unlockedAchievements = game.playerstats.achievements.filter((ac) => ac.achieved !== 0);
			playedGamesAchievementCount += unlockedAchievements.length;

			avgOfAvgPlayed += (unlockedAchievements.length / game.playerstats.achievements.length);

			if(unlockedAchievements.length > 0) {
				gamesWithAtLeast1++;
				gamesWithAtLeast1AchievementMax += game.playerstats.achievements.length;

				avgOfAvg1Unlocked += (unlockedAchievements.length / game.playerstats.achievements.length);
			}

			playedGamesAchievementMax += game.playerstats.achievements.length;
		}
	}
}

avgOfAvgTotal = Math.round(100 * (avgOfAvgPlayed / gamesWithAchievements));
avgOfAvgPlayed = Math.round(100 * (avgOfAvgPlayed / playedGamesWithAchievements));
avgOfAvg1Unlocked = Math.round(100 * (avgOfAvg1Unlocked / gamesWithAtLeast1));

console.log('Total play time:', Math.round(playTime/60), 'hours and', playTime%60, 'minutes.');

console.log('');

console.log('Game count:', games.game_count);

console.log('');

console.log('Played game count:', playedGames);
console.log('	' + Math.round(100 * playedGames / games.game_count) + '% of total games');

console.log('');

console.log('Game amount with achievements:', gamesWithAchievements);
console.log('	' + Math.round(100 * gamesWithAchievements / games.game_count) + '% of total games');

console.log('');

console.log('Game amount with at least 1 achievement:', gamesWithAtLeast1);
console.log('	' + Math.round(100 * gamesWithAtLeast1 / gamesWithAchievements) + '% of total games with achievements');
console.log('	' + Math.round(100 * gamesWithAtLeast1 / playedGamesWithAchievements) + '% of played games with achievements');

console.log('');

console.log('Achievements unlocked:', playedGamesAchievementCount);
console.log('	Total average	| Average of game averages');
console.log('	' + Math.round(100 * playedGamesAchievementCount / gamesAchievementMax) + '% 		| ' + avgOfAvgTotal + '% 				of total achievements (' + gamesAchievementMax + ' achievements)');
console.log('	' + Math.round(100 * playedGamesAchievementCount / playedGamesAchievementMax) + '% 		| ' + avgOfAvgPlayed + '% 				of played games achievements (' + playedGamesAchievementMax + ' achievements)');
console.log('	' + Math.round(100 * playedGamesAchievementCount / gamesWithAtLeast1AchievementMax) + '% 		| ' + avgOfAvg1Unlocked + '% 				of played games with at least 1 unlocked achievements (' + gamesWithAtLeast1AchievementMax + ' achievements)');