const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game')
        .setDescription('Game'),
    async execute(interaction) {
        const randomNumber = Math.random();

        const result = randomNumber > 0.5 ? 'You win!' : 'You lose!';


        await interaction.reply(
            result
        );
    },
};