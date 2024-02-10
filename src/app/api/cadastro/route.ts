import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "@/firebase/repositories/UserRepository";

/**
 * @description
 * Controller que será executada quando um POST na rota /api/cadastro for executado
 */

export async function POST(request: NextRequest, response: NextResponse) {
    const { email, name, password} = await request.json();

    // Verifica se o usuário já existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return NextResponse.json({ message: "Usuário já existe" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const newUser = await createUser({ email, name, password: hashedPassword });

    const accessToken = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, process.env.JWT_SECRET!, {
         expiresIn: "10h",
    });

    return NextResponse.json({ token: accessToken }, { status: 200 });
}
