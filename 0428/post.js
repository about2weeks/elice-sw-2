import API from "./api";

const requestPosts = () => {
  // 데이터를 적절하게 조합하여 Post 정보를 만들어보세요.
  return Promise.all([
    API.fetchPosts(),
    API.fetchUsers()
  ])
  .then(([ posts, users]) => {
        return fetchCommentsByPosts(posts)
        .then(comments => [posts, users, comments]);
  })
  .then(([posts, users, comments]) => {
  
    const userMap = createUserMap(users);
    const commentsMap = createCommentsMap(comments);
    
    return transformPosts(posts, userMap, commentsMap);
    
  });
  
    return new Promise((resolve) => resolve([]));
  
  };
  
  function transformPosts(posts, userMap, commentsMap){
       return posts.map(({id, userId, ...rest}) => {
       
        return {
            ...rest,
            user: userMap[userId],
            comments : commentsMap[id]
        }
        
    })
  }
  
  function createUserMap(users){
  return users.reduce((map, user) => {
    map[user.id] = user
    
    return map
  }, {});
  }
  
  function createCommentsMap(comments){
    return comments.reduce((map, comment) => {
        const array = map[comment.postId] ? map[comment.postId] : []
        array.push(comment);
        map[comment.postId] = array;
        return map;
    }, {});
  }
  
 function fetchCommentsByPosts(posts){
    
    return Promise.all(
        posts.map(post => API.fetchComments(post.id))
    )
    .then(commentArrays => commentArrays.flatMap(array => array));
 }

export default requestPosts;
