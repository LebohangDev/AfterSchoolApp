export function checkEmail(email, button){
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var result = emailRegex.test(email);
    if(result){
        button.disabled = false;
        document.getElementById('msg').innerText=  '';
    }
    else{
        button.disabled = true;
        document.getElementById('msg').innerText = 'invalid Email';
    }

    return result
}

export function checkPhone(phone, button){
    var PhoneRegex = /^\d{10}$/;
    var result = PhoneRegex.test(phone);
    if(result){
        button.disabled = false;
        document.getElementById('msg').innerText=  '';
    }
    else{
        button.disabled = true;
        document.getElementById('msg').innerText = 'invalid Phone Number';
    }

    return result
}

export function checkFirstName(firstName, button){
    var firstNameRegex = /^[a-zA-Z]+$/;
    var result = firstNameRegex.test(firstName);
    if(result){
        button.disabled = false;
        document.getElementById('msg').innerText=  '';
    }
    else{
        button.disabled = true;
        document.getElementById('msg').innerText = 'invalid firstName';
    }

    return result
}


export function checkLastName(lastName, button){
    var lastNameRegex = /^[a-zA-Z]+$/;
    var result = lastNameRegex.test(lastName);
    if(result){
        button.disabled = false;
        document.getElementById('msg').innerText=  '';
    }
    else{
        button.disabled = true;
        document.getElementById('msg').innerText = 'invalid lastName';
    }

    return result
}