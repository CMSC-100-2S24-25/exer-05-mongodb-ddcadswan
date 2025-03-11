import {homepage} from './controller.js';

const router = (app) => {
    app.get('/', homepage);
    app.get('/user', findUser);
    app.get('/members', getMembers);
    app.post('/remove-all-user', removeAll);
    app.post('/remove-user', removeUser);
    app.post('/update', updateStudent);
    app.post('/save-student', saveStudent);
}

export {router};