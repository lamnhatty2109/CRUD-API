import { Controller, Get, Post, Body, Patch, Delete, Render, Redirect, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private serv: UsersService) {}

    @Get()
    @Render('users')
    public async getAll() {
        return { users: await this.serv.findAll()};
    }

    @Get(':id')
    public async getOne(@Param('id') userId: string, @Query() query) {
        if(Number.isInteger(parseInt(userId)))
            return await this.serv.findOne(userId);
        else {
            return await this.serv.searchByName(query.key);
        }
    }

    @Post()
    addUser(
      @Body('firstName') userFName: string,
      @Body('lastName') userLName: string, 
      @Body('image') userImage: string,
      @Body('isActive') userActive: boolean
    ): any {
        this.serv.add(userFName, userLName, userImage, userActive);
    }

    @Patch()
    updateUser(
        @Body('id') userId: string,
        @Body('firstName') userFName: string,
        @Body('lastName') userLName: string,
        @Body('image') userImage: string,
        @Body('isActive') userActive: boolean
    ) {
        this.serv.update(userId, userFName, userLName, userImage, userActive);
    }    

    @Delete(':id')
    deleteUser(@Param('id') userId: string) {
        this.serv.remove(userId);
    }
}
