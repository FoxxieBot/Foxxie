import {
    DiscordEmbed,
    DiscordEmbedDescription,
    DiscordEmbedField,
    DiscordEmbedFields,
    DiscordMessage,
    DiscordMessages,
    DiscordTime
} from '@skyra/discord-components-react';
import { foxxieFeatures } from '../../../../../../assets/foxxieFeatureData';
import { Images } from '../../../../../../assets/images';

export default function ChannelInfo() {
    return (
        <DiscordMessages className='rounded-sm duration-500 lg:rounded-lg'>
            <DiscordMessage roleColor='#898489' author='Ruffpuff' avatar={Images.Reese}>
                .info channel
            </DiscordMessage>
            <DiscordMessage roleColor='#5965f2' avatar={Images.Foxxie} author='Foxxie' bot>
                <DiscordEmbed slot='embeds' authorImage={Images.TheCornerStore} authorName='staff・commands' color='#5A66F2' thumbnail={Images.TheCornerStore}>
                    <DiscordEmbedDescription slot='description'>
                        staff・commands was created on <DiscordTime>September 21, 2021</DiscordTime> (<DiscordTime>9 months ago</DiscordTime>)
                    </DiscordEmbedDescription>
                    <DiscordEmbedFields slot='fields'>
                        <DiscordEmbedField fieldTitle='ℹ️ Topic'>None</DiscordEmbedField>

                        <DiscordEmbedField fieldTitle='📜 Type' inline inlineIndex={1}>
                            Text
                        </DiscordEmbedField>
                        <DiscordEmbedField fieldTitle='🗂️ Category' inline inlineIndex={2}>
                            ━━･ﾟ✧ Staff
                        </DiscordEmbedField>
                        <DiscordEmbedField inline inlineIndex={1} fieldTitle='👥 Members'>
                            10
                        </DiscordEmbedField>

                        <DiscordEmbedField inline inlineIndex={2} fieldTitle='🔞 Nsfw'>
                            No
                        </DiscordEmbedField>

                        <DiscordEmbedField inline inlineIndex={3} fieldTitle='⏰ Cooldown'>
                            None
                        </DiscordEmbedField>
                    </DiscordEmbedFields>
                </DiscordEmbed>
            </DiscordMessage>
            <DiscordMessage roleColor='#898489' author='Ruffpuff' avatar={Images.Reese}>
                {foxxieFeatures.find(f => f.name === 'channel-info')!.description}
            </DiscordMessage>
        </DiscordMessages>
    );
}
