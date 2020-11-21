data.MyChart.hide();
data.genderChart.hide();
data.resultError.hide();
$(document).ready(function(){
    data.ResultExp.html('');
    
    data.SelectProvinsi.append(`
        <option value="choose">Choose ... </option>
    `);

    kawalCovid();

    data.PilihProvinsi.on('click', () => {
        data.MyChart.hide();
        data.genderChart.hide();
        data.ResultExp.html('');

        const provinsi = {
          'idProv' : data.SelectProvinsi.val(),
          'data': 'prov.json',
        };

        if(provinsi.idProv === 'choose' || provinsi.idProv === '' ){
            data.ResultExp.html('');
            data.MyChart.hide();
            data.genderChart.hide();
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
                    data.MyChart.show();
                    
                    data.ResultExp.append(`
                        <div class="col-md-6">
                            <ul style="list-style:none;">
                                <li class="text-primary">${labels[0]}</li>
                                <li class="text-info">${labels[1]}</li>
                                <li class="text-warning">${labels[2]}</li>
                                <li class="text-success">${labels[3]}</li>
                                <li><button class="mt-3 btn btn-primary btn-sm" data-id="${provinsi.idProv}" id="gender">Berdasarkan Gender</button></li>
                            </ul>
                        </div>
                    `);

                    covidChart(last_date, labels, name_prov, dataCovid);
                
                }
            });
        }
    });

    data.ResultExp.on('click', data.berdasarkanGender, function(){
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
                    berdasarkanGender[0].key,
                    berdasarkanGender[1].key
                ];
                const dataChartGender = [      
                    berdasarkanGender[1].doc_count,               
                    berdasarkanGender[0].doc_count
                ];
                data.genderChart.show();
                genderChart(labels, dataChartGender);
            }
        });
    });

});


const kawalCovid = ()=>{
    const covid = {
        'data': "prov.json",
    };

    $.ajax({
        url: `${baseAPI.proxy}${baseAPI.covid}${covid.data}`,
        type: 'get',
        dataType: 'json',
        data: covid.data,
        success: function(res){
            const dataCovid = res.list_data;
            console.log(dataCovid);
            for(let i = 0; i <= dataCovid.length; i++){
                $('#select-provinsi').append(`
                    <option value="${i}">${dataCovid[i]['key']}</option>
                `);
            }
        }
    });
}
data.MyChart.css({
    'height': '400px',
    'width': '1000px',
});

const covidChart = (last_date, labels, label, dataCovid) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `# ${label} | Update : ${last_date}`,
                data: dataCovid,
                backgroundColor: [
                    'rgba(255,218,185, 0.3)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                pointBackgroundColor:[
                    'rgb(255,99,71)'
                ],
                borderWidth: 3,
                pointBorderWidth: 5,
                fill:true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    myChart.update();
}

const genderChart = (labels, dataChartGender) => {
    const ctx2 = document.getElementById('chartGender').getContext('2d');
    const chartGender =  new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            backgroundColor: [
              "#2ecc71",
              "#3498db",
              "#95a5a6",
              "#9b59b6",
              "#f1c40f",
              "#e74c3c",
              "#34495e"
            ],
            data: dataChartGender
          }]
        }
      });

}