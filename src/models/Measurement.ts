import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Measurement extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    customerCode!: string;

    @Column()
    measureDatetime!: Date;

    @Column()
    measureType!: string;

    @Column('float')
    measureValue!: number;

    @Column()
    imageUrl!: string;

    @Column({ default: false })
    confirmed!: boolean;

    @Column({ type: 'float', nullable: true })
    confirmedValue!: number;
}

export const saveMeasurement = async (
    customerCode: string,
    measureDatetime: string,
    measureType: string,
    measureValue: number,
    imageUrl: string
): Promise<Measurement> => {
    const measurement = Measurement.create({
        customerCode,
        measureDatetime: new Date(measureDatetime),
        measureType,
        measureValue,
        imageUrl
    });
    await measurement.save();
    return measurement;
};

export const confirmMeasurement = async (id: string, confirmedValue: number): Promise<void> => {
    await Measurement.update(id, { confirmed: true, confirmedValue });
};

export const getMeasurements = async (customerCode: string, measureType?: string): Promise<Measurement[]> => {
    const query = Measurement.createQueryBuilder('measurement')
        .where('measurement.customerCode = :customerCode', { customerCode });

    if (measureType) {
        query.andWhere('measurement.measureType = :measureType', { measureType: measureType.toUpperCase() });
    }

    return query.getMany();
};

export const getMeasurementByUuid = async (id: string): Promise<Measurement | undefined> => {
    return Measurement.findOne(id);
};