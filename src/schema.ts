import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
export class Ping {
    @Field()
    message!: string;
}

@ObjectType()
export class User {
    @Field(type => ID)
    id!: string;

    @Field()
    createdAt!: Date;

    @Field()
    karma!: number;

    @Field()
    about?: string;

    @Field()
    submitted?: string;
}

@ObjectType()
export class Comment {
    @Field(type => ID)
    id!: string;

    @Field()
    createdAt!: Date;

    @Field()
    by!: User;

    @Field()
    text!: string;

    @Field(type => Comment)
    parent?: Comment;

    @Field(type => [Comment])
    children?: Comment[]
}

@ObjectType()
export class Post {
    @Field(type => ID)
    id!: string;

    @Field()
    createdAt!: Date;

    @Field()
    by!: User;

    @Field()
    title!: string;

    @Field()
    text?: string;

    @Field(type => [Comment])
    comments?: Comment[]
    
    @Field()
    commentCount?: number;

    @Field()
    deleted?: boolean;

    @Field()
    dead?: boolean;

    @Field()
    url?: string;
}