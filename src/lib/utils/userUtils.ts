import db from "@/db/db";
import User from "@/db/models/User";
import bcrypt from 'bcrypt'
db()
export class UserUtils {
  static async isUserExists(email: string) {
    const user = await User.findOne({ email });
    if (user) return { exists: true, user };
    return { exists: false, user: null };
  }
  static async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email: email, password: hashedPassword });
    const createdUser = await newUser.save();
    return createdUser.id;
  }
  static async checkUser(email: string, password: string) {
    const { exists, user } = await UserUtils.isUserExists(email);
    if (!exists) return { valid: false, user: null };
    const isValid = await bcrypt.compare(password, user?.password!);
    return { valid: isValid, user: isValid ? user : null };
  }
}
