$(document).ready(function () {
  $("form").submit(function (event) {
    var formData = {
      name: $("#name").val(),
      email: $("#email").val(),
    };

    $.ajax({
      type: "POST",
      url: "process.php",
      data: formData,
      dataType: "json",
      encode: true,
    })
      .done(function (data) {
        $(".form-group").removeClass("has-error");
        $(".help-block").remove();

        if (!data.success) {
          if (data.errors.name) {
            $("#name-group").addClass("has-error");
            $("#name-group").append(
              '<div class="help-block">' + data.errors.name + "</div>"
            );
          }

          if (data.errors.email) {
            $("#email-group").addClass("has-error");
            $("#email-group").append(
              '<div class="help-block">' + data.errors.email + "</div>"
            );
          }
        } else {
          console.log(data);
        }
      })
      .fail(function (data) {
        $("form").html(
          '<div class="alert alert-danger">Could not reach server, please try again later.</div>'
        );
      });

    event.preventDefault();
  });
});
