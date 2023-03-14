import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {CreateUserDto, CreateUserPostDto, CreateUserProfileDto, UpdateUserDto} from "../../dtos/user.dto";
import {UsersService} from "../../services/users/users.service";

@Controller('users')
export class UsersController {

    constructor(private userService:UsersService) {}

    @Get()
    async getUsers(){
        let data = await this.userService.fetchUsers()
        return data
    }

    @Post()
    async createUsers(@Body() createUserDto:CreateUserDto){
      let user =  await this.userService.createUser(createUserDto)
        return{user}
    }

    @Put(':id')
    async updateUserById(@Param('id', ParseIntPipe) id:number, @Body() updateUserDto:UpdateUserDto){
       let user = await this.userService.updateUserById(id,updateUserDto)
        return user
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id:number){
        let deleted = await this.userService.deleteById(id)
        return deleted
    }

    @Post(':id/profiles')
    async createProfile(@Param('id', ParseIntPipe) id:number, @Body() createUserProfile:CreateUserProfileDto){

        const user = await this.userService.createUserProfile(id,createUserProfile)
        return user
    }

    @Post(':id/posts')
    createUserPost(@Param('id') id:number, @Body() createUserPosts:CreateUserPostDto){

       return this.userService.createUserPosts(id,createUserPosts)

    }


}
