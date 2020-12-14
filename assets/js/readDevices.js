const readDevice = (time, baseurl, name) => {
    let device = Cookies.get(name);
    let date = new Date();
    date.setTime(date.getTime() + (time * 1000));
    // alert(old+' minute');
    // alert(expires);
    // alert(device);
    // alert(date);
    if(typeof device === 'undefined'){
        // Cookies.remove('device', '', {expires: ''});
        askYou(baseurl);

    }else{
        Swal.fire({
            title: 'Hello Welcome',
            html: `
                <h3><span style="font-family:Reey Regular; color:crimson;">Codesyariah Project</span></h3>
            `,
            width: 600,
            padding: '5rem',
            background: `#fff url(${baseurl}/assets/images/project/master-bg2.jpg)`,
            backdrop: `
            rgba(0,0,123,0.4)
            url("${baseurl}/assets/images/project/sayhalo1.gif")
            left top
            no-repeat
            `
        });
        // if(old){
        //     Cookies.remove('device', device, {expies: ''});
        // }  
    }
}