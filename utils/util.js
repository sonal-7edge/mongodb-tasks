function formatFindResult(results){
    console.log(`Find All Documents \n`);
    results.forEach((value,index)=>{
        console.log(`Record : ${index}\nObjectid  : ${value._id}\nName : ${value.name}\nEmail: ${value.email}\nAge  : ${value.age}\nPhone: ${value.phone}\nIsActive: ${value.isActive}\n`);
    });
}

function ageFormatedResult(results){
    console.log(`\nFind All users with age >=30 \n`);
    results.forEach((value)=>{
        console.log(`Name : ${value.name}\tAge: ${value.age}`);
    });
}

function emailFormatedResult(results){
    console.log(`\nFind All users with email id having 'google' \n`);
    results.forEach((value)=>{
        console.log(`Name : ${value.name}\tEmail: ${value.email}`);
    });
}

function nameFormatedResult(results){
    console.log(`\nNames Sorted in Ascending Order \n`);
    results.forEach((value)=>{
        console.log(`${value.name}`)
    });
}
module.exports = {formatFindResult,emailFormatedResult,ageFormatedResult,nameFormatedResult};