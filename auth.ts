import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { connectToDB } from "./utils/database"
import User from "./utils/models/user"
 
export const { handlers, signIn, signOut, auth } = NextAuth ({
  session: {strategy: 'jwt'},
  ...authConfig,

  callbacks:{
    async session({session}) {
      await connectToDB()
      const user = await User.findOne({email: session.user.email})
      session.user.id = user._id.toString()
      return session
    },
    async signIn({profile}) {
      try{
        await connectToDB()
        const user = await User.findOne({email: profile?.email})
        if(!user){
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          })
        }
        return true
      }
      catch(error) {
        console.log(error)
        return false
      }
    }
  }
})