import axios from "axios"
import { users } from "../../../utils/users"
import { NextResponse } from "next/server"

//=>Validación de login
export async function POST(request){
    const body = await request.json()
    
    const { email, password } = body
    const usersDB = users

    try {
        let userFound = false;
        let userActual = ""
        usersDB.forEach(currentUser => {
            if (currentUser.email === email && currentUser.password === password) {
                userFound = true
                userActual = currentUser
            }
        })
        
        if (!userFound) {
            return NextResponse.json({Response: "No existe"}, { status: 200})
        }

        return NextResponse.json(userActual, { status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error}, { status: 500 });
    }
} 

export async function GET() {
    return NextResponse.json({
        hello: "Hello"
    })
}