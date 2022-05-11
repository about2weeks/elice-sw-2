import "./app.css";
import requestUser from "./User";

function createUserListItem(user) {
  return `<li style="list-style:none"><pre><code>${JSON.stringify(
    user,
    null,
    2
  )}</code></pre></li>`;
}

function renderUsers(users) {
  return users.map((user) => createUserListItem(user).trim()).join("");
}

const App = () => {
  const button = document.getElementById("request-user-button");
  const result = document.getElementById("result");

  button.addEventListener("click", () => {
    requestUser().then((users) => {
      result.innerHTML = renderUsers(users);
    });
  });
};

export default App;
