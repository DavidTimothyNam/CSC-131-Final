function commentCharacterLimit(){
    $('textarea').keyup(function() {

        var characterCount = $('#floatingTextarea2Disabled').val().length,
            current = $('#current');

        current.text(characterCount);


        /*This isn't entirely necessary, just playin around*/
        if (characterCount < 100) {
            current.css('font-weight', '400')
        }
        else if (characterCount > 99 && characterCount < 200) {
            current.css('color', '#6d5555');
            current.css('font-weight', '450')
        }
        else if (characterCount > 199 && characterCount < 300) {
            current.css('color', '#793535');
            current.css('font-weight', '500')
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