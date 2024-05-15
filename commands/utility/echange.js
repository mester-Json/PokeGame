const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const connection = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echange')
        .setDescription('Echange')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur avec qui échanger')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('mypokemon')
                .setDescription('Le nom de votre Pokémon à échanger')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('theirpokemon')
                .setDescription('Le nom du Pokémon de l\'autre utilisateur à échanger')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const myPokemonName = interaction.options.getString('mypokemon');
        const theirPokemonName = interaction.options.getString('theirpokemon');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('confirm')
                    .setLabel('Confirmer')
                    .setStyle(1),
                new ButtonBuilder()
                    .setCustomId('refuse')
                    .setLabel('Refuser')
                    .setStyle(4)
            );

        await interaction.reply({ content: `${user.username}, voulez-vous échanger votre ${theirPokemonName} contre le ${myPokemonName} de ${interaction.user.username} ?`, components: [row] });

        const filter = i => (i.customId === 'confirm' || i.customId === 'refuse') && i.user.id === user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000, max: 1 });
        collector.on('collect', async (i) => {
            if (i.user.bot) return;
            if (i.customId === 'confirm') {
                await interaction.followUp({ content: 'Échange confirmé!', components: [] });
                connection.query(
                    'UPDATE pokemon SET user = ? WHERE user = ? AND NamePokemon = ?',
                    [user.id, interaction.user.id, myPokemonName],
                    (err) => {
                        if (err) {
                            console.error(err);
                            return interaction.followUp('Une erreur est survenue lors de l\'échange de Pokémon.');
                        }
                    }
                );
                connection.query(
                    'UPDATE pokemon SET user = ? WHERE user = ? AND NamePokemon = ?',
                    [interaction.user.id, user.id, theirPokemonName],
                    (err) => {
                        if (err) {
                            console.error(err);
                            return interaction.followUp('Une erreur est survenue lors de l\'échange de Pokémon.');
                        }
                    }
                );
            } else if (i.customId === 'refuse') {
                await interaction.followUp({ content: 'Échange refusé.', components: [] });
            } else {
                setTimeout(() => {
                    i.update({ content: 'Echange Annuler Temps Écouler ', components: [] });
                }, 120000);
            }
        });
    }
};