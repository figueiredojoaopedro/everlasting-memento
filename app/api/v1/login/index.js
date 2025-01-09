const login = async (request, response) => {
  try {
    response.status(200).json({});
  } catch (error) {
    response.status(500).json({});
  }
};

export default login;
