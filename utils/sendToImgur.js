import axios from 'axios';

export default function sendImageToImgur(file) {
    return new Promise(async (resolve, reject) => {
        const readFile = new FileReader();
        readFile.readAsDataURL(file);
        readFile.onload = function(){
            const readResult = this.result.substr((this.result.search(/base64,/)+7));
            
            /**
            * @params Client-ID need a valid token based on Imgur API
            * see it on: https://apidocs.imgur.com/ or https://imgur.com
            */

            axios({
                method: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                    Authorization: 'Client-ID 90b04794aac6a13',
                },
                data: {
                    image: readResult,
                }
            })
            .then(response => resolve(response))
            .catch(error => reject(error));
        }
    });
}