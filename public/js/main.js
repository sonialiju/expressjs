$(document).ready(function () {
    // Delete User function
    $(".deleteUser").on("click", function () {
        var confirmation = confirm("Are u sure?");
        if (confirmation) {
            $.ajax({
                type: 'DELETE',
                url: 'persons/' + $(this).data('id')
            }).done(function (response) {
            });
            window.location.replace('/persons');

        } else {
            return false;
        }
    });
});
