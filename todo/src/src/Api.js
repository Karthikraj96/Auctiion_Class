import axios from "axios"

const Base_Api = "https://stark-brook-58201.herokuapp.com"

const api = axios.create({
    baseURL : Base_Api,
    timeout : 10000
});
export function getTodo (){
    return api.get( "/todos")
}
export function saveTodo(data){
    return api.post("/",data)
}