import { NextResponse } from "next/server";
import { movies } from "../../../utils/movies";


export async function GET() {

    const moviesDB = movies

    return NextResponse.json(moviesDB, {
        status: 200
    })
}
