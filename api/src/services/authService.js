const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils/httpError");

const defaultTeacherUser = "docente";
const defaultTeacherPassword = "123456";
const defaultStudentUser = "aluno";
const defaultStudentPassword = "123456";
const defaultSecret = "dev-only-secret-change-in-production";

class AuthService {
  login({ username, password }) {
    const teacherUser = process.env.AUTH_USERNAME || defaultTeacherUser;
    const teacherPassword = process.env.AUTH_PASSWORD || defaultTeacherPassword;
    const studentUser = process.env.AUTH_STUDENT_USERNAME || defaultStudentUser;
    const studentPassword = process.env.AUTH_STUDENT_PASSWORD || defaultStudentPassword;

    const accounts = [
      { username: teacherUser, password: teacherPassword, role: "docente" },
      { username: studentUser, password: studentPassword, role: "aluno" }
    ];

    const matchedAccount = accounts.find(
      (account) => account.username === username && account.password === password
    );

    if (!matchedAccount) {
      throw new HttpError(401, "Credenciais invalidas");
    }

    const secret = process.env.JWT_SECRET || defaultSecret;

    const token = jwt.sign({ role: matchedAccount.role, username: matchedAccount.username }, secret, {
      expiresIn: "8h"
    });

    return {
      token,
      user: {
        username: matchedAccount.username,
        role: matchedAccount.role
      }
    };
  }

  verifyToken(token) {
    const secret = process.env.JWT_SECRET || defaultSecret;
    return jwt.verify(token, secret);
  }
}

module.exports = { AuthService };