import { Resolver, Query, Arg } from "type-graphql"
import { Ping, User } from "./schema"
import { getUser } from "./helpers"

@Resolver(Ping)
export class PingResolver {
    @Query(returns => Ping)
    ping() {
        const ping = new Ping()
        ping.message = `The current time is ${new Date().toISOString()}`
        return ping
    }
}

@Resolver(User)
export class UserResolver {
    @Query(returns => User) 
    async user(@Arg("username") username: string) {
        return getUser(username)
    }
}