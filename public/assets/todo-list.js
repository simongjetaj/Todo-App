$(document).ready(function () {

  $('form').on('submit', function () {

    const item = $('form input');
    const todo = {
      item: item.val()
    };

    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: function (data) {
        $("ul").prepend(`<li>${data.item}</li>`);
        $("#item").val('');
      }
    });

    return false;

  });

  $('li').on('click', function () {
    var item = $(this).text().replace(/ /g, "-");
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + item,
      success: function (data) {
        location.reload();
      }
    });
  });

});