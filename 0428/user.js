import API from "./api";

function transformUser(user){

const email = user.email;
const {first, last } = user.name;
const {country, state, city} = user.location

const name = `${first} ${last}`;

const pictureUrl = user.picture.large;
const username = user.login.username;
const location = `${country}, ${state}, ${city}`;

const age = user.dob.age;

return { email, name, pictureUrl, username, location, age};
}

function filterByAge(user){
    return user.age>=40;
}

const requestUsers = () => {
  return API.fetchUsers().then((users) => {
    // 유저 정보를 변화하고, 필터링하는 코드를 작성해보세요.
    return users.map(transformUser).filter(filterByAge);
  });
};

export default requestUsers;
