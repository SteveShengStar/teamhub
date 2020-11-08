const { WebClient } = require("@slack/web-api");

// Create a new instance of the WebClient class with the token read from your environment variable
const web = new WebClient(process.env.SLACK_TOKEN);

const getAllUsers = async () => {
  try {
    const users = await web.users.list({
      limit: 3 // Can be modified
    });
    return users;
  } catch (error) {
    console.log(error);
  }
}

const getUser = async (email) => {
  try {
    const user = await web.users.lookupByEmail({
      email: email
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async (email) => {
  const user = await getUser(email);
  return user.user.id;
}

export const startGroupConversation = async (users) => {
  try {
    return await web.conversations.open({
      users: users
    })
  } catch(error) {
    console.log(error);
  }
}
