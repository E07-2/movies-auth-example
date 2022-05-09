import jsonwebtoken from "jsonwebtoken";

// 1 receive user details
// 2 generate a token with those details
// 3 return the token
export async function issueJwt(user) {
  return await jsonwebtoken.sign(
    {
      id: user._id,
      iat: Date.now(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
}

export function authenticateJwt(token) {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
}
