var fshelper = require('../index.js');

//fshelper.mkdirSync('./test/testDir1/testDir2');


//fshelper.copyFile('./package.json','test/aa.json',function (){
//    console.log('copy file success!');
//})

var size =fshelper.getSize('./package.json');
console.log(size);