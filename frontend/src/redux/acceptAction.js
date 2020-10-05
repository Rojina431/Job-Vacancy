import Axios from "axios";


export const postFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    const body= JSON.stringify({"_id": dishId});
    const headers= {
        "Content-Type": "application/json",
        'Authorization': bearer
      };
    Axios.post('/api/jobs/getAccept',body,headers)
    .then(response=>{
        if(response.success){
            return response;
        }else{
            var error=new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
        error => {
              throw error;
        })
      .then(response => response.json())
      .then(accepts => { console.log('Accepted', accepts); 
      dispatch({
        type: ActionTypes.ADD_ACCEPT,
        payload: favorites}); 
    })
      
  }
  
    