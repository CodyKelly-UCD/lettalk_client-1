import runtimeEnv from "@mars/heroku-js-runtime-env";

export function checkValidEmail(email){
    //Check if email is valid first
    const env = runtimeEnv();
    return fetch(`${env.REACT_APP_API_URL}/checkValidEmail?email=${email}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors'})
        .then( (response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .catch( (e) => {
            console.log(e)
            return e
        }

        );

}