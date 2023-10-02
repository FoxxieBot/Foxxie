import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('userLastFmPlays', { schema: 'public' })
export class UserPlay extends BaseEntity {
    @ObjectIdColumn()
    public _id!: string;

    @Column()
    public track: string;

    @Column()
    public album: string;

    @Column()
    public artist: string;

    @Column()
    public timestamp: number;

    @Column()
    public userId: string;

    public constructor(data: Partial<UserPlay>) {
        super();
        Object.assign(this, data);
    }
}
