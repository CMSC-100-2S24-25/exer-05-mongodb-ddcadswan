import needle from 'needle';

const url = 'http://localhost:3000';
const requestData = { age: 30 };  // Test data

// Send a POST request with JSON data
needle.post(
    url,
    requestData,  // Corrected data structure
    (err, res) => {
        if (err) console.error(err);
        else console.log(res.body);
    }
);
