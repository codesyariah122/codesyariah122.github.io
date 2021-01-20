data.MyChart.html('');
data.resultError.hide();

$(document).ready(function(){
    data.ResultExp.html('');
    
    data.SelectProvinsi.append(`
        <option value="choose">Choose ... </option>
    `);

    kawalCovid();

    data.PilihProvinsi.on('click', () => {
        data.MyChart.html('');
        data.ResultExp.html('');

        const provinsi = {
          'idProv' : data.SelectProvinsi.val(),
          'data': 'prov.json',
        };

        if(provinsi.idProv === 'choose' || provinsi.idProv === '' ){
            data.MyChart.hide();
            data.genderChart.hide();
            data.usiaChart.hide();
            data.ResultExp.html('');
            data.resultError.show('slow').fadeIn(1000);
        }else{
            data.ResultExp.html('');
            data.resultError.hide('slow').slideUp(1000);
            data.SelectProvinsi.val('choose');
            $.ajax({
                url: `${baseAPI.proxy}${baseAPI.covid}${provinsi.data}`,
                type: 'get',
                dataType: 'json',
                data: provinsi.idProv,
                success: function(res){
                    genderChart('', '');
                    usiaChart('', '');
                    const last_date = res.last_date;
                    const result = res.list_data[provinsi.idProv];
                    const name_prov = result.key;

                    const labels = [`Kasus : ${result.jumlah_kasus}`, `Dirawat : ${result.jumlah_dirawat}`, `Meninggal : ${result.jumlah_meninggal}`, `Sembuh : ${result.jumlah_sembuh}`];
                    
                    const resData = {
                        'kasus': result.jumlah_kasus,
                        'dirawat': result.jumlah_dirawat,
                        'meninggal': result.jumlah_meninggal, 
                        'sembuh': result.jumlah_sembuh
                    };                    
                    
//                     const dataCovid = [resData.kasus, resData.dirawat, resData.meninggal, resData.sembuh];

                    const dataCovid = Object.keys(resData).map((key)=>resData[key]);
//                     const labels = Object.keys(resData).map((key)=>key);

                    const objData = Object.entries(resData);                    
                    
                    // console.log(result); 
                    // data.MyChart.show();
                    
                    data.ResultExp.append(`
                        <div class="col-md-6">
                            <ul style="list-style:none;">
                                ${objData.map((data) => (
                                    `<li>${data}</li>`
                                )).join('')}
                                <li class="mt-2">
                                <b>Lihat Berdasarkan : </b>     
                                <button class="mt-2 btn btn-primary btn-sm" data-id="${provinsi.idProv}" id="gender">Gender</button> <button class="mt-2 btn btn-danger btn-sm" data-id="${provinsi.idProv}" id="usia">Usia</button></li>
                            </ul>
                        </div>
                    `);

                    covidChart(last_date, labels, name_prov, dataCovid);
                
                }
            });
        }
    });

    data.ResultExp.on('click', '#gender', function(){
        // data.usiaChart.hide();
        const dataGender = {
            'idGender' : $('#gender').data('id'),
            'dataProv': 'prov.json',
          };
        $.ajax({
            url: `${baseAPI.proxy}${baseAPI.covid}${dataGender.dataProv}`,
            type: 'get',
            dataType: 'json',
            data: dataGender.idGender,
            success: function(res){
               const setFirst = res.list_data[dataGender.idGender].jenis_kelamin;
                const gender = Object.keys(setFirst).map((key) => [key, setFirst[key]]);
                const count = Object.keys(setFirst).map((key) => [key, setFirst[key]]);

                
                const genderData = [
                    gender[0][1].key,
                    gender[1][1].key
                ];
                const genderCount = [
                    count[0][1].doc_count,
                    count[1][1].doc_count,
                ];
                
                genderChart(genderData, genderCount);            }
        });
    });

    data.ResultExp.on('click', '#usia', function(){
        // data.genderChart.hide();
        const dataUsia = {
            'idUsia' : $('#usia').data('id'),
            'dataProv': 'prov.json',
          };
        $.ajax({
            url: `${baseAPI.proxy}${baseAPI.covid}${dataUsia.dataProv}`,
            type: 'get',
            dataType: 'json',
            data: dataUsia.idUsia,
            success: function(res){
                const setFirst = res.list_data[dataUsia.idUsia].kelompok_umur;
                const age = Object.keys(setFirst).map((key) => [key, setFirst[key]]);
                const count = Object.keys(setFirst).map((key) => [key, setFirst[key]]);

                const ageData = [
                    age[0][1].key,
                    age[1][1].key,
                    age[2][1].key,
                    age[3][1].key,
                    age[4][1].key,
                    age[5][1].key
                ];
                const ageCount = [
                    age[0][1].doc_count,
                    age[1][1].doc_count,
                    age[2][1].doc_count,
                    age[3][1].doc_count,
                    age[4][1].doc_count,
                    age[5][1].doc_count
                ];

                usiaChart(ageData, ageCount);
            }
        });
    
    });
    

});

