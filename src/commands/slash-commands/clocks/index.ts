import { ChatInputCommandInteraction } from 'discord.js'
import { buildClockMessageOptions } from '../utils/buildClockMessageOptions.js'
import ClockService from '../../../services/ClockService.js'
import { ClockOptions } from '../clock/types.js'

export const clocks = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply({ ephemeral: true })

  if (interaction.guildId === null) {
    await interaction.editReply({
      content: `Cannot find guildId`
    })
  }
  const clocks = (await ClockService.getClocks(interaction.guildId || '')).map(
    (ref) => ref.data()
  ) as ClockOptions[]

  const embeds = clocks.map((clockOptions) => {
    return buildClockMessageOptions(clockOptions).embeds[0]
  })

  if (embeds.length > 0) {
    interaction.editReply({ embeds })
  } else {
    interaction.editReply({ content: 'No clocks found!' })
  }
}