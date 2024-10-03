import connectDB from '@/db/connectDB';
import User from '@/app/models/user';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const { email, password } = await request.json();
  await connectDB();
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email,username:email.split("@")[0], password: hashedPassword });
  await newUser.save();
  
  return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
}
