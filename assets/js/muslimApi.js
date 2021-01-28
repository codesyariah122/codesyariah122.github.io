const MulaiWaktuAdzan = (value, arr1, arr2) => {

        const shalat = arr1;
        let nama = '';
        if(shalat.includes(value)){
            if(value === shalat[0]){
                nama = "Imsak";
            }else if(value === shalat[1]){
                nama = "Fajr";
            }else if(value === shalat[2]){
                nama = "Sunrise";
            }else if(value === shalat[3]){
                nama = "Dhuhr";
            }else if(value === shalat[4]){
                nama = "Asr";
            }else if(value === shalat[5]){
                nama = "Maghrib";
            }else if(value === shalat[6]){
                nama = "Isha";
            }else if(value === shalat[7]){
                nama = "Qiyamullail";
            }
            $('#now2').append(`<b>Memasuki Waktu ${nama}</b>`);
        }else{
            $('#now2').append(`<b>Menunggu waktu shalat selanjutnya</b>`)
        }

}

const jadwalShalat = (url, today, city, success, err) => {
    const data = {
        "city": city
    }
    $.ajax({
        url: `${baseAPI.proxy}${url}${today}`,
        type: 'get',
        dataType: 'json',
        data: data,
        success: function(res){
            const result = res.results;

            const objres = {
                tanggal: result.datetime[0].date,
                islamtime: result.datetime[0].times,
            }
            // console.log(res);

            const tanggal = {
                'hijriah': objres.tanggal.hijri,
                'gregoria': objres.tanggal.gregorian,
            };
            const islamTime = {
                'Imsak': objres.islamtime.Imsak,
                'Fajr': objres.islamtime.Fajr,
                'Sunrise': objres.islamtime.Sunrise,
                'Dhuhr': objres.islamtime.Dhuhr,
                'Asr': objres.islamtime.Asr,
                'Maghrib': objres.islamtime.Maghrib,
                'Isha': objres.islamtime.Isha,
                'Qiyamullail': objres.islamtime.Midnight,
            };

            // const waktuAdzanNya = [adzan.Imsak, adzan.Fajr, adzan.Dhuhr, adzan.Asr, adzan.Maghrib, adzan.Isha];
            // const Adzan = waktuAdzan.includes(jam);
            // const Adzan = waktuAdzan.indexOf(jam);
            const waktuAdzan = Object.values(islamTime);
            const waktuShalat = Object.keys(islamTime);
            // console.log(waktuShalat);
            const date = new Date();
            const now = date.getHours()+':'+date.getMinutes();
            now.toString();
            // alert(now);
            // alert(typeof now);
            MulaiWaktuAdzan(now, waktuAdzan, waktuShalat);

            $('#tanggal').html(`${tanggal.hijriah} Hijriah | ${tanggal.gregoria}`);

            $.each(islamTime, function(key, value){
                $('#waktu-adzan').append(`
                    <li class="list-group-item text-dark"><b>${key}</b> : ${value}</li>
                `);
            });

        }, complete: function() {
            console.log("Loading ... ")
        }
    })
}
