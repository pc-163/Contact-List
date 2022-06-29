
var contactDetails = [];
let edit = false;
let currentId, currentIndex, globalProperty;

function renderDetail() {
    const table = document.getElementById("detail-table");
    table.innerHTML = '';

    for (let i = 0; i < contactDetails.length; i++) {

        const itemID = contactDetails[i].id;
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        cell1.innerHTML = contactDetails[i].fname;
        cell2.innerHTML = contactDetails[i].address;
        cell3.innerHTML = contactDetails[i].number;
        cell4.innerHTML = contactDetails[i].email;
        cell5.innerHTML = `<i onclick="editRow('${itemID}')">Edit</i><i onclick="deleteRow('${itemID}')">Delete</i>`;
        //console.log(table);

        cell1.addEventListener('click', function () {
            addProperty(i, 'fname');
            document.getElementById('contact-form').style.display = 'none';
            document.getElementById('update-form').style.display = 'block';
        });
        cell2.addEventListener('click', function () {
            addProperty(i, 'address');
            document.getElementById('contact-form').style.display = 'none';
            document.getElementById('update-form').style.display = 'block';
        });
        cell3.addEventListener('click', function () {
            addProperty(i, 'number');
            document.getElementById('contact-form').style.display = 'none';
            document.getElementById('update-form').style.display = 'block';
        });
        cell4.addEventListener('click', function () {
            addProperty(i, 'email');
            document.getElementById('contact-form').style.display = 'none';
            document.getElementById('update-form').style.display = 'block';
        });
    }

    return false;
}

//submit form data
function submitF() {
    const isValid = validation(); //validation
    if (isValid) {
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
}

//reupdate values
function addProperty(i, currentProperty) {
    currentIndex = i;
    globalProperty = currentProperty;
    document.getElementById("update").value = contactDetails[i][currentProperty];
}

//update single data
function updateData() {
    contactDetails[currentIndex][globalProperty] = document.getElementById('update').value;
    renderDetail();
    document.getElementById("update").value = '';
    return false;
}

//update data
function updateRow() {

    //normal edit update
    contactDetails[currentId].fname = document.getElementById('fname').value;
    contactDetails[currentId].address = document.getElementById('address').value;
    contactDetails[currentId].number = document.getElementById('number').value;
    contactDetails[currentId].email = document.getElementById('email').value;
    edit = false;
    renderDetail();
    document.getElementById("fname").value = '';
    document.getElementById("address").value = '';
    document.getElementById("number").value = '';
    document.getElementById("email").value = '';
}



//delete row
function deleteRow(id) {
    var item = contactDetails.filter((item) => item.id != id);
    contactDetails = item;
    renderDetail();
    document.getElementById("fname").value = '';
    document.getElementById("address").value = '';
    document.getElementById("number").value = '';
    document.getElementById("email").value = '';
}


//form validation
function validation() {
    const fname = document.getElementById('fname').value;
    const address = document.getElementById('address').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;

    if (fname == "") {
        document.getElementById("fname-hide").classList.add("error");
        return false;
    }
    if (address == "") {
        document.getElementById("add-hide").classList.add("error");
        return false;
    }
    if (number == "") {
        document.getElementById("number-hide").classList.add("error");
        return false;
    }
    if (email == "") {
        document.getElementById("mail-hide").classList.add("error");
        return false;
    }


    // if (fname == '' || address == '' || number == '' || email == '') {
    //     document.getElementById("fname-hide").classList.add("error");
    //     document.getElementById("add-hide").classList.add("error");
    //     document.getElementById("number-hide").classList.add("error");
    //     document.getElementById("mail-hide").classList.add("error");
    //     return false;
    // }

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

//display form
let addDetail = document.getElementById("hide-click");
addDetail.addEventListener('click', function () {
    document.getElementById('contact-form').style.display = 'block';
    document.getElementById('update-form').style.display = 'none';
});