const { SlashCommandBuilder } = require('discord.js');

const connection = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mypokemon')
        .setDescription('My Pokemon'),
    async execute(interaction) {
        connection.query(
            'SELECT * FROM pokemon WHERE user = ?',
            [interaction.user.id],
            function (err, results) {
                if (err) {
                    console.error(err);
                    return interaction.reply('Une erreur est survenue lors de la récupération de vos Pokémon.');
                }

                if (results.length === 0) {
                    return interaction.reply('Vous n\'avez pas de Pokémon.');
                }

                const pokemonNames = results.map(pokemon => pokemon.NamePokemon).join(', ');

                return interaction.reply(`Vous avez les Pokémon suivants : ${pokemonNames}`);
            }
        );
    },
};