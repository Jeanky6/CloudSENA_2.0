import API_URL_LOGIN from '../../constants/api'
 export default function validateUser(login){
    return fetch(API_URL_LOGIN.LOGIN,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
    .then(response=> response.json())
}