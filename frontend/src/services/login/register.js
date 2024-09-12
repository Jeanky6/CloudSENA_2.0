import API_URL from '../../constants/api'
 export default function registerUser(login){
    return fetch(`${API_URL.LOGIN}/register`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
    .then(response=> response.json())
}