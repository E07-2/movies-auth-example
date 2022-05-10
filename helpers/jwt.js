import jsonwebtoken from "jsonwebtoken";

// 1 receive user details
// 2 generate a token with those details
// 3 return the token
export async function issueJwt(user) {
  const payload = {
    id: user._id,
    iat: Date.now(),
  };

  return await jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

export function authenticateJwt(token) {
  // returns a promise
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
}
