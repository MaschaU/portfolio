$.each($.validator.methods, function (key, value) {
    $.validator.methods[key] = function () {           
        if(arguments.length > 0) {
            arguments[0] = $.trim(arguments[0]);
        }
        return value.apply(this, arguments);
    };
});

$("#form-controller").validate({
    errorElement: "label",
    errorClass: "error",
    errorPlacement: function(error, element) {
        error.insertAfter(element);
        error.show();
        error.animate({right: '-120px'});
    },
    submitHandler: function(){
        swal({
            closeOnClickOutside: true,
            title: "Success" , 
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit." , 
            icon: "success"
        });
    }
});

$(document).on('click','label.error', function(){
    $(this).parent().find('> *').not('label.error').removeClass('error');
    $(this).animate({right: '-200px'},function(){
        $(this).fadeOut('400',function(){
            $(this).remove();
        });
    });
});
