import mongoose from 'mongoose';


// await mongoose.connect('mongodb://127.0.0.1:27017/StudentDatabase');
async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/StudentDatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

connectDB();

// Student Model
const Student = mongoose.model('studentData', {
    stdnum: String,
    fname: String,
    lname: String,
    age: Number
}, 'studentData');

// Homepage
const homepage = (req, res) => {
    res.send('Welcome to the Homepage');
};

// Save Student
const saveStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.json({ inserted: true });
    } catch (error) {
        res.json({ inserted: false });
    }
};

// Update
const updateStudent = async (req, res) => {
    try {
        const { fname, newFname } = req.body;
        const result = await Student.updateOne({ fname }, { fname: newFname, lname: "Parker" });
        res.json({ updated: result.modifiedCount > 0 });
    } catch (error) {
        res.json({ updated: false });
    }
};

// Remove Student
const removeUser = async (req, res) => {
    try {
        const { stdnum } = req.body;
        const result = await Student.deleteOne({ stdnum });
        res.json({ deleted: result.deletedCount > 0 });
    } catch (error) {
        res.json({ deleted: false });
    }
};

// Remove All User
const removeAll = async (req, res) => {
    try {
        const result = await Student.deleteMany({});
        res.json({ deleted: result.deletedCount > 0, count: result.deletedCount});
    } catch (error) {
        res.json({ deleted: false });
    }
};

// Find User
const findUser = async (req, res) => {
    try {
        const { stdnum } = req.query;
        const students = await Student.find({ stdnum });
        res.json(students);
    } catch (error) {
        res.json([]);
    }
};

// Get all members
const getMembers = async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        res.json([]);
    }
};

export { homepage, saveStudent, updateStudent, removeUser, removeAll, findUser, getMembers };