import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' }) // Adicionar o tipo timestamp é opcional
  created_at: Date; // Data será automaticamente preenchida com a data de criação

  @Column({ default: 'Y' })
  is_active: string;
}
