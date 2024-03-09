import { json } from "https://deno.land/x/sift@0.6.0/mod.ts"
import {
  APIApplicationCommandInteraction,
  InteractionResponseType,
} from "https://deno.land/x/discord_api_types@0.37.71/v10.ts"

import CampaignService from "../../../../../_shared/services/CampaignService.ts"

const handleInit = async (interaction: APIApplicationCommandInteraction) => {
  const discord_guild_id = interaction.guild_id!
  const discord_user_id = interaction.member?.user.id!

  // const campaign = await CampaignService.findByDiscordGuildId(
  //   { discord_guild_id },
  // )

  // if (campaign) {
  //   return json({
  //     type: InteractionResponseType.ChannelMessageWithSource,
  //     data: {
  //       content: "This Campaign has already initialized",
  //       flags: 1 << 6,
  //     },
  //   })
  // }

  const newCampaign = await CampaignService.create({
    discord_guild_id,
    name: "TEMP = " + discord_guild_id,
  }, { discord_id: discord_user_id! })

  const content = `Campaign Created! ${newCampaign.id}`
  return json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content,
      flags: 1 << 6,
    },
  })
}

export default handleInit
