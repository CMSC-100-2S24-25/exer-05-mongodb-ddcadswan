import needle from 'needle';

const url = 'http://localhost:3000';

const students = [
    { stdnum: "1840439827", fname: "Dal", lname: "Diaz", age: 20 },
    { stdnum: "7658394039", fname: "Kath", lname: "Diaz", age: 22 },
    { stdnum: "8051495845", fname: "Alice", lname: "Guo", age: 19 },
    { stdnum: "1399403293", fname: "Brent", lname: "Manalo", age: 21 },
    { stdnum: "4563829048", fname: "Mary Jane", lname: "Watson", age: 23 }
];

// Helper function to make requests sequentially
const postRequest = (endpoint, data) => {
    return new Promise((resolve, reject) => {
        needle.post(`${url}${endpoint}`, data, (err, res) => {
            if (err) return reject(err);
            console.log(res.body);
            resolve(res.body);
        });
    });
};

const getRequest = (endpoint) => {
    return new Promise((resolve, reject) => {
        needle.get(`${url}${endpoint}`, (err, res) => {
            if (err) return reject(err);
            console.log(res.body);
            resolve(res.body);
        });
    });
};

// Sequentially execute all requests
const runRequests = async () => {
    try {
        // Save students one by one
        for (const student of students) {
            await postRequest('/save-student', student);
        }

        // Find a specific user
        console.log('FOUND USER:');
        await getRequest('/user?stdnum=1840439827');

        // Update "Mary Jane" to "Mary Parker"
        await postRequest('/update', { fname: "Mary Jane", newFname: "Mary", newLname: "Parker" });

        // Remove a specific student
        await postRequest('/remove-user', { stdnum: "8051495845" });

        // Get all members
        console.log('ALL MEMBERS:');
        await getRequest('/members');

        // Remove all students
        await postRequest('/remove-all-user', {});

    } catch (error) {
        console.error('Error:', error);
    }
};

runRequests();
