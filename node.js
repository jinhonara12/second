// create-json.js
const fs = require('fs');

const data = {
    name: 'John Doe',
    age: 31,
    occupation: 'Software Developer'
};

// JSON 데이터를 문자열로 변환 (포맷팅 포함)
const jsonData = JSON.stringify(data, null, 2);

// 파일 경로 지정
const filePath = 'data.json';

// 비동기적으로 파일 생성
fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log(`JSON file has been created at ${filePath}`);
    }
});