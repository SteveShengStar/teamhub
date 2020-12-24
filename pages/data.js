const data = [
  {
    key: 0,
    title: "Choose projects you want to work on",
    body: "Add yourself to a project here.",
    completed: false
  },
  {
    key: 1,
    title: "Complete WHMIS safety training",
    body: (
      <ol>
        <li>
          Log in to <a href="http://learn.uwaterloo.ca">learn.uwaterloo.ca</a>
        </li>
        <li>
          On the homepage, click on <strong>Self-Registration</strong>
        </li>
        <li>
          Enrol in <strong>WHMIS</strong> training course
        </li>
        <li>Upload your certificate</li>
      </ol>
    ),
    completed: false
  },
  {
    key: 2,
    title: "Stay connected with us",
    body: (
      <div>
        Check out our social media pages and follow them...It helps us get sponsors!
        <ul>
          <li>
            <a href="https://www.facebook.com/teamwaterloop">Facebook</a>
          </li>
          <li>
            <a href="https://www.facebook.com/teamwaterloop">Instagram</a>
          </li>
          <li>
            <a href="https://www.facebook.com/teamwaterloop">LinkedIn</a>
          </li>
          <li>
            <a href="https://www.facebook.com/teamwaterloop">Twitter</a>
          </li>
        </ul>
        We also have less “official” social medias :^)
        <ul>
          <li>
            <a href="https://www.facebook.com/teamwaterloop">Discord</a>
          </li>
          <li>
            <a href="https://www.facebook.com/teamwaterloop">Meme Page</a>
          </li>
        </ul>
      </div>
    ),
    completed: false
  },
  {
    key: 3,
    title: "Read the GSuite documment",
    body: (
      <div>
        Link here: <a href="http://wloop.ca/gsuite">GSuite</a>
        You’re responsible for knowing all of it, so ask @emrys if you have any questions.
      </div>
    ),
    completed: false
  }
];

export default data;
