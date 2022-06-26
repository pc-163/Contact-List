
var contactDetails = [];
let edit = false;
let currentId;
let globalCell1, globalCell2, globalCell3, globalCell4;
function renderDetail() {
    const table = document.getElementById("detail-table");
    table.innerHTML = '';

    for (let i = 0; i < contactDetails.length; i++) {

        const itemID = contactDetails[i].id;
        //const rowId = Math.floor((Math.random() * 5000) + 402);
        
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        globalCell1 = cell1;
        globalCell2 = cell2;
        globalCell3 = cell3;
        globalCell4 = cell4;

        cell1.innerHTML = contactDetails[i].fname;
        cell2.innerHTML = contactDetails[i].address;
        cell3.innerHTML = contactDetails[i].number;
        cell4.innerHTML = contactDetails[i].email;
        cell5.innerHTML = `<i onclick="editRow('${itemID}')">Edit</i><i onclick="deleteRow('${itemID}')">Delete</i>`;
        //console.log(table);
        
        cell1.addEventListener('click', function() {
            addName(cell1.innerHTML);
        });
          cell2.addEventListener('click', function() {
            addAddress(cell2.innerHTML);
          });
          cell3.addEventListener('click', function() {
            addNumber(cell3.innerHTML);
          });
          cell4.addEventListener('click', function() {
            addEmail(cell4.innerHTML);
          });
    }
   
    return false;
}

//submit form data
function submitF() {
    const isValid = validation(); //validation
    if (isValid) {
        //console.log("contactDetails", contactDetails);

        if (edit) {
            updateRow();
            //alert("List Update");
            return false;
        } else {

            const fname = document.getElementById('fname').value;
            const address = document.getElementById('address').value;
            const number = document.getElementById('number').value;
            const email = document.getElementById('email').value;
            const id = Math.floor((Math.random() * 5000) + 402);

            var obj = {};
            obj["fname"] = fname;
            obj["address"] = address;
            obj["number"] = number;
            obj["email"] = email;
            obj["id"] = id;
            contactDetails.push(obj);

            if (fname !== '' && address !== '' && number !== '' && email !== '') {
                renderDetail();
                //document.querySelectorAll("#detail-table td").classList.add("mystyle");
            } else {
                alert('Field Can not be Empty');
            }   

            document.getElementById("fname").value = '';
            document.getElementById("address").value = '';
            document.getElementById("number").value = '';
            document.getElementById("email").value = '';
            return false;
        }
    } else {
        //console.log("contactDetails", contactDetails);
        return false;
    }
}

//edit row data
function editRow(id) {

    contactDetails.map((item, i) => {
        if (item.id == id) {
            currentId = i; //pass the i index number to editindex
            document.getElementById("fname").value = item.fname;
            document.getElementById("address").value = item.address;
            document.getElementById("number").value = item.number;
            document.getElementById("email").value = item.email;
        }
    });
    edit = true;
    // console.log(edit);
    // console.log(contactDetails);
}

function addName(name) {
    document.getElementById("fname").value = name;
}
function addAddress(address) {
    document.getElementById("address").value = address;
}
function addNumber(number) {
    document.getElementById("number").value = number;
}
function addEmail(email) {
    document.getElementById("email").value = email;
}

// globalCell.addEventListener('click', function() {
//     console.log('add');
    
//   });
//   function addName(name) {
//     contactDetails.map((item, i) => {
//         if (item.fname == name) {
//             document.getElementById("fname").value = item.fname;
//         }
//     });
// }
  

//update data
function updateRow() {

    //normal edit update
    contactDetails[currentId].fname = document.getElementById('fname').value;
    contactDetails[currentId].address = document.getElementById('address').value;
    contactDetails[currentId].number = document.getElementById('number').value;
    contactDetails[currentId].email = document.getElementById('email').value;

    //single use
    contactDetails[globalCell1].fname = document.getElementById('fname').value;
    contactDetails[globalCell2].address = document.getElementById('address').value;
    contactDetails[globalCell3].number = document.getElementById('number').value;
    contactDetails[globalCell4].email = document.getElementById('email').value;

    
    document.getElementById("fname").value = '';
    document.getElementById("address").value = '';
    document.getElementById("number").value = '';
    document.getElementById("email").value = '';
    edit = false;
    // console.log(edit);
    // console.log(contactDetails);
    renderDetail();
}



//delete row
function deleteRow(id) {
    var item = contactDetails.filter((item) => item.id != id);
    contactDetails = item;
    renderDetail();
    //console.log(contactDetails);
}


//form validation
function validation() {

    const fname = document.getElementById('fname').value;
    const address = document.getElementById('address').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;

    if (fname == '' || address == '' || number == '' || email == '') {
        document.getElementById("fname-hide").classList.add("error");
        document.getElementById("add-hide").classList.add("error");
        document.getElementById("number-hide").classList.add("error");
        document.getElementById("mail-hide").classList.add("error");
        return false;
    }

    if (contactDetails.length > 0) {
        const numberValue = contactDetails.find((item) =>
            item.number == number
        );
        if (numberValue) {
            alert("Number is already exist...");
            document.getElementById("fname").value = '';
            document.getElementById("address").value = '';
            document.getElementById("number").value = '';
            document.getElementById("email").value = '';
            return false;
        } else {
            // alert("No Matching email found...");
        }

        const emailValue = contactDetails.find((item) =>
        item.email == email
    );
    if (emailValue) {
        alert("Email already exist...");
        document.getElementById("fname").value = '';
        document.getElementById("address").value = '';
        document.getElementById("number").value = '';
        document.getElementById("email").value = '';
        return false;
    } else {
        // alert("No Matching email found...");
    }
    }

    // if (contactDetails.length > 0) {
    //     contactDetails.find((item) => {
    //         if (item.email == email) {
    //             alert("Email Match");
    //             return false;
    //         }
    //         else if (item.number == number) {
    //             alert("Number Match");
    //             return false;
    //         }else{
    //             alert("Not Match");
    //         }
    //     } );
    // }

    // if (fname == "") {
    //     document.getElementById("fname-hide").classList.add("error");
    //     return false;
    // }
    // if (address == "") {
    //     document.getElementById("add-hide").classList.add("error");
    //     return false;
    // }
    // if (number == "") {
    //     document.getElementById("number-hide").classList.add("error");
    //     return false;
    // }
    // if (email == "") {
    //     document.getElementById("mail-hide").classList.add("error");
    //     return false;
    // }

    return true;
}

//form validation
function textEmpty() {
    document.getElementById("fname-hide").classList.remove("error");
}
function textEmptysnd() {
    document.getElementById("add-hide").classList.remove("error");
}
function textEmptytrd() {
    document.getElementById("number-hide").classList.remove("error");
}
function textEmptyfrth() {
    document.getElementById("mail-hide").classList.remove("error");
}

