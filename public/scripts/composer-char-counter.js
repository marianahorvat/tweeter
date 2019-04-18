$(document).ready(function () {
  console.log("Document ready")
  //$(() => { alert('Hello!'); });
  // --- our code goes here ---

  $('textarea').on('keyup', function (event) {
    let len = $(this).val().length;
    let max = 140;
    //let showChar = max - len
    console.log('Event: keyup', event.target.value);
    if (len >= max) {
      //var val = val.substring(0, max);
      $('#charNum', this.parentElement).text(max - len).addClass("setRed");
    } else {
      $('#charNum', this.parentElement).text(max - len).removeClass("setRed");
    }
  })
});

