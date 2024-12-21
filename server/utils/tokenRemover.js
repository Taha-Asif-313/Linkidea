// JWT token generator
export const tokenRemover = (res) => {
  // Responce
  return res.status(200).clearCookie("AuthToken");
};
