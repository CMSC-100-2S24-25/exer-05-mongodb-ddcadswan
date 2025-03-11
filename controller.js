import mongoose from 'mongoose';


await mongoose.connect('mongodb://127.0.0.1:27017/StudentDatabase');


// Student Model
const Student = mongoose.model('Student', {
    stdnum: String,
    fname: String,
    lname: String,
    age: Number
});

const homepage = (req, res) => {
    res.send('Welcome to the Homepage');
};

export { homepage };
