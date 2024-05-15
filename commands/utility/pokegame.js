const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, } = require('discord.js');
const axios = require('axios');

const connection = require('../../database');

const timestamps = new Map();
const cooldownAmount = 24 * 60 * 60 * 1000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pokegame')
        .setDescription('Pokegame'),
    async execute(interaction) {
        const now = Date.now();
        const userId = interaction.user.id;

        if (timestamps.has(userId)) {
            const expirationTime = timestamps.get(userId) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000 / 60 / 60;
                return interaction.reply(`Veuillez attendre ${timeLeft.toFixed(1)} heures avant de réutiliser la commande \`/pokegame\`.`);
            }

        }
        timestamps.set(userId, now);
        setTimeout(() => timestamps.delete(userId), cooldownAmount);

        try {
            const response = await axios.get('https://pokebuildapi.fr/api/v1/pokemon');

            if (response.status === 200) {
                const pokemonList = response.data;

                const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];

                const embed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(`Vous avez attrapé un ${randomPokemon.name} !`)
                    .setImage(randomPokemon.image);
                await interaction.reply({ embeds: [embed] });

                const query = 'INSERT INTO pokemon (user, NamePokemon, NumberPokemon) VALUES (?, ?, ?)';
                connection.query(query, [userId, randomPokemon.name, randomPokemon.pokedexId], function (err, results, fields) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log(`Le Pokémon ${randomPokemon.name} a été ajouté avec succès à la base de données.`);
                    }
                });
            } else {
                await interaction.reply('Une erreur est survenue lors de la récupération des Pokémon.');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('Une erreur est survenue lors de la récupération des Pokémon.');
        }
    },
};