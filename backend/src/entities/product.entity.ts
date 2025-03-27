import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ nullable: true })
    description: string;
    
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: Category;
}
