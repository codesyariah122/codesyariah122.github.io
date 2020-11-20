data.MyChart.hide();
data.resultError.hide();
$(document).ready(function(){
    data.ResultExp.html('');
    
    data.SelectProvinsi.append(`
        <option value="choose">Choose ... </option>
    `);

    kawalCovid();

    data.PilihProvinsi.on('click', () => {
        
        data.ResultExp.html('');

        const provinsi = {
          'idProv' : data.SelectProvinsi.val(),
          'data': 'prov.json',
          'urlProxy' : "https://cors-anywhere.herokuapp.com/",
        };

        if(provinsi.idProv === 'choose' || provinsi.idProv === '' ){
            data.ResultExp.html('');
            data.MyChart.hide('slow').slideUp(1000);
            data.resultError.show('slow').fadeIn(1000);
        }else{
            data.resultError.hide('slow').slideUp(1000);
            data.SelectProvinsi.val('choose');
            $.ajax({
                url: `${provinsi.urlProxy}https://data.covid19.go.id/public/api/${provinsi.data}`,
                type: 'get',
                dataType: 'json',
                data: provinsi.idProv,
                success: function(res){
                    const last_date = res.last_date;
                    const result = res.list_data[provinsi.idProv];
                    const name_prov = result.key;
                    const labels = ['Jumlah Kasus', 'Dirawat', 'Meninggal', 'Sembuh'];
                    const resData = [
                            result.jumlah_dirawat,
                            result.jumlah_kasus,
                            result.jumlah_meninggal, 
                            result.jumlah_sembuh
                    ];

                    // console.log(result); 
                    data.MyChart.show();
                    
                    data.ResultExp.append(`
                        <div class="col-md-6">
                            <ul style="list-style:none;">
                                <li class="text-primary">${labels[0]} : ${resData[0]} Jiwa</li>
                                <li class="text-info">${labels[1]} : ${resData[1]} Jiwa</li>
                                <li class="text-warning">${labels[2]} : ${resData[2]} Jiwa</li>
                                <li class="text-success">${labels[3]} : ${resData[3]} Jiwa</li>
                                <li><button class="mt-3 btn btn-primary btn-sm" id="tambahanKasus">Penambahan</button></li>
                            </ul>
                        </div>
                    `);

                    covidChart(last_date, labels, name_prov, resData);
                
                }
            });
        }
    });

});


const kawalCovid = ()=>{
    const covid = {
        'urlProxy': "https://cors-anywhere.herokuapp.com/",
        'data': "prov.json",
    };

    $.ajax({
        url: `${covid.urlProxy}https://data.covid19.go.id/public/api/${covid.data}`,
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

const PenambahanKasus = (labels, dataCovid) => {
    var ctx2 = document.getElementById('chartTambahan').getContext('2d');
    var chartTambahan = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
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