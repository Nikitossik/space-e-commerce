// import {Button} from "antd";
// import axios from "axios";
//
// export const SendSMSTest = () => {
//     const phoneFrom = '380630759386'
//     const login = '380930390593'
//     const password = 'Luca131117'
//     const message = `Тестове смс`
//     const phoneTo = '380503846331'
//     const key = '23fcb4880edbb93b0210f0768d8adcb73babcb29'
//     const url = 'https://alphasms.ua/api/http.php'
//     const fromName = 'space'
//     const sendSMS = async () => {
//         const data = await axios.get(`https://alphasms.ua/api/http.php?version=http&key=${key}&command=send&from=${fromName}t&to=${phoneTo}&message=test`)
//
//
//         console.log(data)
//     }
//
//
//     return (<Button onClick={sendSMS}>Відправити СМС</Button>)
// }