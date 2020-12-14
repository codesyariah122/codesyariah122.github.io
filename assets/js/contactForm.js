window.addEventListener("DOMContentLoaded", function() {
  
    // get the form elements defined in your form HTML above
    const fullName = document.getElementById('fullname').value;
    var form = document.getElementById("my-form");
    var button = document.getElementById("my-form-button");
    var status = document.getElementById("my-form-status");
    
    // Success and Error functions for after the form is submitted
    
    function success() {
      form.reset();
      button.style = "display: none ";
      status.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Terima kasih </strong> <span class="namanya"></span> email anda sudah kami terima.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
      `;
    }

    function error() {
      status.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Ooopss ! ada kesalahan saat proses pengiriman data.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
      `;
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      const fullName = document.getElementById('fullname').value;
      const email = document.getElementById('email').value;
      const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var data = new FormData(form);
      if(email !== ''){
        if(!regex.test(email)){
            Swal.fire({
                title: 'Maaf, Format Email Tidak Valid.',
                width: 600,
                padding: '3em',
                background: `#fff url(${obj.validationBackdrop}author5.jpg)`,
                backdrop: `
                rgba(0,0,123,0.4)
                url("${obj.validationGif}fails.gif")
                left top
                no-repeat
                `
            });
        } else {
            Swal.fire({
              title: `Terimakasih ... ${fullName}`,
              width: 600,
              padding: '3em',
              background: `#fff url(${obj.validationBackdrop}author5.jpg)`,
              backdrop: `
              rgba(0,0,123,0.4)
              url("${obj.validationGif}yes.gif")
              left top
              no-repeat
              `
            });
          ajax(form.method, form.action, data, success, error);
        }
      }else{
          Swal.fire({
            title: 'Maaf, Contact form belum di isi dengan benar.',
            width: 600,
            padding: '3em',
            background: `#fff url(${obj.validationBackdrop}author5.jpg)`,
            backdrop: `
            rgba(0,0,123,0.4)
            url("${obj.validationGif}empty.gif")
            left top
            no-repeat
            `
          });
      }
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }