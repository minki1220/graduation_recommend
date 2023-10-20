import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  // 상태확인
  if (req.method === "POST") {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const email = req.body.email;
    const name = req.body.name;

    let db = (await connectDB).db("store");
    const existingUser = await db.collection("user_cred").findOne({ email });
    
    if (email,password,confirmPassword,name == '') {
      return res.status(500).json('빈칸을 채워주세요.')
    }

    if (existingUser) {
      // 동일한 이메일 주소가 이미 존재하는 경우 오류 메시지를 반환합니다.
      const errorMessage = "이미 사용 중인 이메일 주소입니다.";
      return res.status(400).json({ message: errorMessage });
    }

    if (password !== confirmPassword) {
      // 비밀번호와 비밀번호 확인이 일치하지 않을 때 클라이언트에게 알림 표시
      const errorMessage = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
      return res.status(400).json({ message: errorMessage });
    }

    const hash = await bcrypt.hash(password, 10);
    req.body.password = hash;

    const confirmPasswordhash = await bcrypt.hash(confirmPassword, 10);
    req.body.confirmPassword = hash;

   
    db = (await connectDB).db("store");
    await db.collection("users").insertOne(req.body);
    res.redirect(302, "/api/auth/signin");
  }
}