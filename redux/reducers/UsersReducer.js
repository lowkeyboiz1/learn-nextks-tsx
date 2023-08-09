const UsersReducer = (posts = [], action) => {
    switch (action.type) {
      case 'FETCH_ALL':
        // Assuming the action.payload contains an array of posts fetched from an API
        return action.payload
  
      case 'CREATE':
        // Assuming the action.payload contains a new post to add
        return [...posts, action.payload]
  
      default:
        return posts
    }
  }
  
  export default UsersReducer
  