import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '0000',
    database: 'nest-prac',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
