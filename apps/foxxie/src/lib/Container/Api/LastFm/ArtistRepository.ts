import { container } from '@sapphire/framework';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ArtistRepository {
    public static async getArtistForName(artistName: string) {
        const found = await container.db.lastFmArtists.getArtist(artistName);
        return found;
    }

    public static async getUserArtists(userId: string) {
        return container.db.lastFm.artists.find({
            where: {
                userId
            }
        });
    }
}
