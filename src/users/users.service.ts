import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Entity, OneToMany, getConnection } from 'typeorm';
import { User } from './user.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async searchByName(key: string) {
    const usersSearched = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("upper(user.firstName) like upper(:key) or upper(user.lastName) like upper(:key)", { key: '%' + key + '%' })
    .getMany();

    return usersSearched;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async add(firstName: string, lastName: string, image: string, isActive: boolean): Promise<void> {
      var user = new User();

      if(firstName) user.firstName = firstName;
      if(lastName) user.lastName = lastName;
      if(image) user.image = image;
      if(isActive) user.isActive = isActive;

      await this.usersRepository.insert(user);
  }

  async update(id: string, firstName: string, lastName: string, image: string, isActive: boolean): Promise<void> {
    var user = new User();

    if(id) user.id = id;
    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(image) user.image = image;
    if(isActive) user.isActive = isActive;

    //check id not empty
    await this.usersRepository.update(id , user);
  }
}