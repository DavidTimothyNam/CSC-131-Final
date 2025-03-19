function commentCharacterLimit(id){
    $('textarea').keyup(function() {

        var characterCount = $(`#${id}`).val().length,
            current = $('#current');

        current.text(characterCount);


        /*This isn't entirely necessary, just playin around*/
        if (characterCount < 100) {
            current.css('color','black');
            current.css('font-weight', '400');
        }
        else if (characterCount > 99 && characterCount < 200) {
            current.css('color', '#6d5555');
            current.css('font-weight', '450');
        }
        else if (characterCount > 199 && characterCount < 300) {
            current.css('color', '#793535');
            current.css('font-weight', '500');
        }
        else if (characterCount > 299 && characterCount < 400) {
            current.css('color', '#841c1c');
            current.css('font-weight', '550');
        }
        else if (characterCount > 399 && characterCount < 500){
            current.css('color', '#6e0003');
            current.css('font-weight', '600');
        }
        else {
            current.css('color', '#5a0103');
            current.css('font-weight', '650');
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function checkIfValid(id){
    let input = document.getElementById(id)
    if(id === 'floatingInputName'){
        if(!input.value){ // if invalid
            input.className = 'form-control is-invalid'
        }
        else { // valid
            input.className = 'form-control is-valid'
        }
    }
    else if(id === 'floatingInputEmail'){
        if(!input.value || !isValidEmail(input.value)){ // if invalid
            input.className = 'form-control is-invalid'
        }
        else { // valid
            input.className = 'form-control is-valid'
        }
    }
    else if(id === 'floatingSelectTopic'){
        if(input.value === 'Select An Option'){ // if invalid
            input.className = 'form-control is-invalid'
        }
        else { // valid
            input.className = 'form-control is-valid'
        }
    }
    else if(id === 'floatingInputComment'){
        if(!input.value){ // if invalid
            input.className = 'form-control is-invalid'
        }
        else { // valid
            input.className = 'form-control is-valid'
        }
    }
}

function checkBoxes(){
    let input = document.getElementById('floatingInputName')
    if(!input.value){ // if invalid
        input.className = 'form-control is-invalid'
    }
    else { // valid
        input.className = 'form-control'
    }

    input = document.getElementById('floatingInputEmail')
    if(!input.value || !isValidEmail(input.value)){ // if invalid
        input.className = 'form-control is-invalid'
    }
    else { // valid
        input.className = 'form-control is-valid'
    }

    input = document.getElementById('floatingSelectTopic')
    if(input.value === 'Select An Option'){ // if invalid
        input.className = 'form-control is-invalid'
    }
    else { // valid
        input.className = 'form-control is-valid'
    }

    input = document.getElementById('floatingInputComment')
    if(!input.value){ // if invalid
        input.className = 'form-control is-invalid'
    }
    else { // valid
        input.className = 'form-control is-valid'
    }
}