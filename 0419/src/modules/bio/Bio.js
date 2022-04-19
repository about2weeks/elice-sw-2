import EditBioForm from './EditBio.js'

//1. database.js에서 사용자가 입력한 정보를 데이터베이스에서 가져오는 getEntryFromDb 함수를 import하세요.
import { getEntryFromDb } from '../../database.js';

const Bio = async () => {
//2. getEntryFromDb를 사용해서 bio라는 객체저장소에서 json 데이터를 가져와 userInfo라는 변수에 넣으세요.
const userInfo = await getEntryFromDb('bio');

//3. p태그로 감싸진 name과 about을 렌더링하세요.
  return `
  <section class="bio">
    <div class="profile-photo">
      <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="profile-photo">
    </div>
    <div class="profile-info">
      <p class="name"> ${userInfo[0] ? userInfo[0].name : 'please update your name'} </p>
      <p class="about"> ${userInfo[0] ? userInfo[0].about : 'please update your about'}</p>
      <button class="edit-bio-button"}>Edit bio</button>
    </div>
    ${EditBioForm()}
  </section>
`}

export default Bio