/**
 * @license Apache License 2.0
 * @copyright 2019 Skyra Project
 */
import type { ScheduleManager } from '#lib/structures';
import { Events } from '#lib/types/Events';
import { container } from '@sapphire/pieces';
import { Cron } from '@sapphire/time-utilities';
import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

export const enum ResponseType {
    Ignore,
    Delay,
    Update,
    Finished
}

export type PartialResponseValue =
    | { type: ResponseType.Ignore | ResponseType.Finished }
    | { type: ResponseType.Delay; value: number }
    | { type: ResponseType.Update; value: Date };

export type ResponseValue = PartialResponseValue & { entry: ScheduleEntity };

@Entity('schedule', { schema: 'public' })
export class ScheduleEntity extends BaseEntity {
    #manager: ScheduleManager = null!;

    @ObjectIdColumn()
    public _id!: string;

    /**
     * The id for this scheduled task
     */
    @Column({ type: 'integer' })
    public id!: number;

    /**
     * The name of the Task this scheduled task will run
     */
    @Column('varchar')
    public taskId!: string;

    /**
     * The Date when this scheduled task ends
     */
    @Column('timestamp without time zone')
    public time!: Date;

    /**
     * Whether this scheduled task is scheduled with the Cron pattern
     */
    @Column('varchar', { nullable: true, default: null })
    public recurring: Cron | null = null;

    /**
     * If the task should catch up in the event the bot is down
     */
    @Column('boolean', { default: true })
    public catchUp = true;

    /**
     * The stored metadata to send to the Task
     */
    @Column('jsonb')
    public data!: Record<string, unknown>;

    /**
     * Whether or not the entity is running
     */
    #running = false;

    /**
     * Whether or not the entity is paused
     */
    #paused = true;

    public constructor() {
        super();

        if (this.recurring) this.recurring = new Cron(this.recurring.cron);
    }

    public setup(manager: ScheduleManager) {
        this.#manager = manager;

        return this;
    }

    public async run(): Promise<ResponseValue> {
        const { task } = this;
        if (!task?.enabled || this.#running || this.#paused) return { entry: this, type: ResponseType.Ignore };

        this.#running = true;
        let response: PartialResponseValue | null = null;
        try {
            response = (await task.run({ ...(this.data ?? {}), id: this.id })) as PartialResponseValue | null;
        } catch (error) {
            container.client.emit(Events.TaskError, error, { piece: task, entity: this });
        }

        this.#running = false;

        if (response !== null) return { ...response, entry: this };

        return this.recurring
            ? { entry: this, type: ResponseType.Update, value: this.recurring.next() }
            : { entry: this, type: ResponseType.Finished };
    }

    public resume() {
        this.#paused = false;
        return this;
    }

    public pause() {
        this.#paused = true;
        return this;
    }

    public delete() {
        return this.#manager.remove(this);
    }

    public get task() {
        return container.db.tasks.get(this.taskId) ?? null;
    }

    public get running() {
        return this.#running;
    }
}
