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

                    const labels = [`Kasus : ${result.jumlah_kasus} Jiwa`, `Dirawat : ${result.jumlah_dirawat} Jiwa`, `Meninggal : ${result.jumlah_meninggal} Jiwa`, `Sembuh : ${result.jumlah_sembuh} Jiwa`];
                    const resData = {
                        'kasus': result.jumlah_kasus,
                        'dirawat': result.jumlah_dirawat,
                        'meninggal': result.jumlah_meninggal, 
                        'sembuh': result.jumlah_sembuh
                    };
                    const dataCovid = [resData.kasus, resData.dirawat, resData.meninggal, resData.sembuh];

                    // console.log(result); 
                    // data.MyChart.show();
                    
                    data.ResultExp.append(`
                        <div class="col-md-6">
                            <ul style="list-style:none;">
                                <li>${labels[0]}</li>
                                <li>${labels[1]}</li>
                                <li>${labels[2]}</li>
                                <li>${labels[3]}</li>
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
                const berdasarkanGender = res.list_data[dataGender.idGender].jenis_kelamin;

                const labels = [
                    `${berdasarkanGender[0].key} : ${berdasarkanGender[0].doc_count} Jiwa | `,
                    `${berdasarkanGender[1].key} : ${berdasarkanGender[1].doc_count} jiwa | `
                ];

                const dataChartGender = [      
                    berdasarkanGender[1].doc_count,               
                    berdasarkanGender[0].doc_count
                ];

                // data.genderChart.show();
                genderChart(labels, dataChartGender);
            }
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
                const berdasarkanUsia = res.list_data[dataUsia.idUsia].kelompok_umur;
                console.log(berdasarkanUsia);
                const labels = [
                    `${berdasarkanUsia[0].key} Tahun : ${berdasarkanUsia[0].doc_count} Jiwa | `,
                    `${berdasarkanUsia[1].key} Tahun : ${berdasarkanUsia[1].doc_count} Jiwa | `,
                    `${berdasarkanUsia[2].key} Tahun : ${berdasarkanUsia[2].doc_count} Jiwa | `,
                    `${berdasarkanUsia[3].key} Tahun : ${berdasarkanUsia[3].doc_count} Jiwa | `,
                    `${berdasarkanUsia[4].key} Tahun : ${berdasarkanUsia[4].doc_count} Jiwa | `,
                    `${berdasarkanUsia[5].key} Tahun : ${berdasarkanUsia[5].doc_count} Jiwa | `,
                ];
                const dataChartUsia = [
                    berdasarkanUsia[0].doc_count,
                    berdasarkanUsia[1].doc_count,
                    berdasarkanUsia[2].doc_count,
                    berdasarkanUsia[3].doc_count,
                    berdasarkanUsia[4].doc_count,
                    berdasarkanUsia[5].doc_count
                ];
                // data.usiaChart.show();
                usiaChart(labels, dataChartUsia);
            }
        });
    
    });
    

});

