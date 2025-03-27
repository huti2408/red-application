
import {
    Entity, Column,
    PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn, UpdateDateColumn, JoinColumn
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    amount: number;

    @Column()
    images: string[];

    @Column({ default: false })
    outOfStock: boolean;

    @ManyToOne(() => Category, category => category.products, { eager: true })
    @JoinColumn({ name: "categoryId" })
    Category: Category;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
