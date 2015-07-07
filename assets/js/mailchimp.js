function validate_input () {
  return true;
}

function register($form) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) {
                        $('#emailForm').html('<div class="alert alert-danger" role="alert"><strong>Error</strong> Could not connect to the registration server. Please try again later.</div>');
                        },
        success     : function(data) {
            if (data.result != "success") {
                console.log('result: ' + JSON.stringify(data));
                $form.show();
                $('#emailForm').html('<div class="alert alert-warning" role="alert"><strong>Oops!</strong> ' + data.msg + '</div>');
                console.log('result: ' + JSON.stringify(data));
            } else {
                $('#emailForm').html('<button class="btn btn-success btn-lg" disabled>You\'re signed up &#10003;</button><br><div class="alert alert-success" role="alert"><strong>Awesome!</strong> ' + data.msg + '</div>');
                $('#email-subscribe').fadeOut(5000);
            }

        }
    });
}

$(document).ready( function () {

    var $form = $('#signup');
    $('#signup').submit('click', function ( event ) {
        if ( event ) event.preventDefault();
        if ( validate_input($form) ) {
          register($form);
          $form.hide();
          $('#emailForm').html('<img src="assets/img/loading.gif" />');
        }
    });
});
