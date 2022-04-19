//** 데이터베이스 생성하기: 실습 4에서 작성 **/
const onRequest = indexedDB.open('instagram',1);


onRequest.onsuccess = () => {
   const database = onRequest.result
   console.log('Success creating or accessing db')
}

onRequest.onupgradeneeded = () => {
  const database = onRequest.result

    database.createObjectStore('bio',{autoIncrement:true});

}

onRequest.onerror = () => {
  alert('Error creating or accessing db')
}

//사용자가 입력한 데이터를 데이터베이스에 추가
const addEntryToDb = (storeName, entry) => {
const database = onRequest.result
// ** 실습 1에서 작성
//1) 데이터베이스에 입력하기 위해 transaction을 실행
const transaction = database.transaction([storeName]);
//2) store에 값을 삽입하기 위해 objectStore() 함수로 테이블 선택 및 add() 함수로 원하는 객체를 추가 */
const store = transaction.objectStore(storeName);
store.add(entry);
transaction.onerror = () => {
    console.log(`error adding Entry to ${storeName}.`)
    console.log(transaction.error);
  }
}



//데이터베이스에 저장된 데이터를 화면에 렌더링
const getEntryFromDb = (storeName, id) => {
  const data = new Promise((resolve, reject) => {
    const database = onRequest.result
    //1. transaction을 생성해서 객체 저장소에 접근하세요.
    const transaction = database.transaction([storeName]);
    const store = transaction.objectStore(storeName)
    //2. id가 유효하다면 store.get()을 사용해서 request에 가져온 데이터를 할당합니다.
    //유효하지 않다면 store.getAll()을 반환합니다.
  
    const request = id ? store.get(id) : store.getAll();
    
    request.onerror = () => {
      reject(request.error)
      console.log('error getting data from the store');
    }

    request.onsuccess = () => {
      resolve(request.result)
    }
  })

  return Promise.resolve(data)
}

const clearAllEntries = (storeName) => {
  const database = onRequest.result
  const transaction = database.transaction([storeName], 'readwrite')
  const store = transaction.objectStore(storeName)
  store.clear()
}

export { onRequest, addEntryToDb, getEntryFromDb, clearAllEntries }
