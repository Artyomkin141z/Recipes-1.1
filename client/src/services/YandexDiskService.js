const token = 'y0_AgAAAABlxM18AAiLYQAAAADSyN7ub54V1B6ySGeKa2AnWF79luzPgRo';
const clientId ='8b1786c21682491e9f3d097d6468a4e3';
const secret = '65e738db9b6e4b4a97d506388d58b2ae'

// y0_AgAAAABlxM18AAiLYQAAAADSyN7ub54V1B6ySGeKa2AnWF79luzPgRo

// http://localhost:3000/#access_token=y0_AgAAAABlxM18AAiLYQAAAADSyN7ub54V1B6ySGeKa2AnWF79luzPgRo&token_type=bearer&expires_in=31535084

export default class YandexDisk { 
    static async getUrl (filename){
        try{
            let response = fetch(`https://cloud-api.yandex.net/v1/disk/resources/upload?path=$%Recipes%${filename}&overwrite=true`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
            }});
            console.log(response);
            return response;
        }catch(e){
            console.log(e);
        }
    }
}