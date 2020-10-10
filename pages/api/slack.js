const { WebClient } = require("@slack/web-api");

// Create a new instance of the WebClient class with the token read from your environment variable
const web = new WebClient(process.env.SLACK_TOKEN);

const getAllUsers = async () => {
  try {
    const users = await web.users.list({
      limit: 3 // change later
    });
    return users;
  } catch (error) {
    console.log(error);
  }
}

const getUser = async (email = "lucas.b@waterloop.ca") => {
  try {
    const user = await web.users.lookupByEmail({
      email: email
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getUserId = async (email = "lucas.b@waterloop.ca") => {
  const user = await getUser(email);
  return user.user.id;
}

const startGroupConversation = async () => {
  try {
    return await web.conversations.open({
      users: "U01ARJNKHLK,U6BKF3Z6E,U01BBSQFJ01"
    })
  } catch(error) {
    console.log(error);
  }
}

// (async () => {
//   console.log(await getUserId("darryl.w@waterloop.ca"));
// })();

(async () => {
  console.log(await startGroupConversation());
})();


