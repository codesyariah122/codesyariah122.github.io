$(document).ready(function(){
    if(location.href == projURL){
        Swal.fire({
            title: 'Hello Welcome',
            html: `
                <h3><span style="font-family:Reey Regular; color:crimson;">Codesyariah Project</span></h3>
            `,
            width: 300,
            padding: '3em',
            background: `#fff url(${imgURL}project/master-bg2.jpg)`,
            backdrop: `
              rgba(0,0,123,0.4)
              url("${imgURL}project/sayhalo.gif")
              left top
              no-repeat
            `
          });
    }
})

function baseURL(param){
    return param;
}

function imageURL(url, param){
    return url+param;
}