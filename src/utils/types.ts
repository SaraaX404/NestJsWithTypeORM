export type CreateUserParams = {
    username:string;
    password:string;
}

export class UpdateUserParams{
    username:string;
    password:string;
}

export class CreateUserProfileParams{
    firstName:string;
    lastName:string;
    age:number;
    dob:string;
}

export class CreateUserPostParams{
    title:string;
    description:string;
}
