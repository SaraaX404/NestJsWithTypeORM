import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../typeorm/entities/User";
import {Repository} from "typeorm";
import {CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams} from "../../../utils/types";
import {Profile} from "../../../typeorm/entities/Profile";
import {Post} from "../../../typeorm/entities/Posts";

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User) private userRepository:Repository<User>,
                @InjectRepository(Profile) private profileRepository:Repository<Profile>,
                @InjectRepository(Post) private postRepository:Repository<Post>) {
    }

    fetchUsers(){
        return this.userRepository.find({relations:['profile', 'posts']})
    }

    async createUser(createUserDetails: CreateUserParams){
        const newUser = this.userRepository.create({...createUserDetails, createdAt: new Date()})
        return this.userRepository.save(newUser)
    }

    async updateUserById(id:number,updateUserDetails:UpdateUserParams){

       return this.userRepository.update({id}, {...updateUserDetails})

    }

    async deleteById(id:number){
        return this.userRepository.delete({id})
    }

    async createUserProfile(id:number,createUserProfile:CreateUserProfileParams){

        const user = await this.userRepository.findOneBy({id})
        if(!user){
            throw new HttpException(
                'User Not Found. Cannot create Profile',
                HttpStatus.BAD_REQUEST
            )
        }

        const newProfile = this.profileRepository.create(createUserProfile)

        const savedProfile = await this.profileRepository.save(newProfile)

        user.profile = savedProfile
        return this.userRepository.save(user)




    }

    async createUserPosts(id:number,createUserPosts:CreateUserPostParams){

        const user = await this.userRepository.findOneBy({id})
        if(!user){
            throw new HttpException(
                'User Not Found. Cannot create Profile',
                HttpStatus.BAD_REQUEST
            )
        }


        const newPost = this.postRepository.create({...createUserPosts, user})
        return await this.postRepository.save(newPost)

    }




}
