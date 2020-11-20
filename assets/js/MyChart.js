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
                    const labels = ['Kasus', 'Dirawat', 'Meninggal', 'Sembuh'];
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
                                <li class="text-primary">${labels[0]} : ${resData.kasus} Jiwa</li>
                                <li class="text-info">${labels[1]} : ${resData.dirawat} Jiwa</li>
                                <li class="text-warning">${labels[2]} : ${resData.meninggal} Jiwa</li>
                                <li class="text-success">${labels[3]} : ${resData.sembuh} Jiwa</li>
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
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `# ${label} | Update : ${last_date}`,
                data: dataCovid,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
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
}

const genderChart = (labels, dataChartGender) => {
    var ctx2 = document.getElementById('chartGender').getContext('2d');
    var chartGender =  new Chart(ctx2, {
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