const kawalCovid = (url, data, success, error) => {
    $.ajax({
        url: `${baseAPI.proxy}${url}${data}`,
        type: 'get',
        dataType: 'json',
        data: data,
        success: function(res){
            const dataCovid = res.list_data;
             // for(let i = 0; i <= dataCovid.length; i++){
            //     $('#select-provinsi').append(`
            //         <option value="${i}">${dataCovid[i]['key']}</option>
            //     `);
            // }
            dataCovid.map((key, index) => {
                $('#select-provinsi').append(`
                    <option value="${index}">${key.key}</option>
                `)
            })
        }, complete: function() {
            console.log("Loading ... ")
        }
    });
}


const covidChart = (last_date, labels, label, dataCovid) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    if(window.bar != undefined) 
    window.bar.destroy(); 
    // window.bar  = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: labels,
    //         datasets: [{
    //             label: `# ${label} | Update : ${last_date}`,
    //             data: dataCovid,
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }
    // });
    // myChart.update();
    window.bar  = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `# ${label} | Update : ${last_date}`,
                data: dataCovid,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132,1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

const genderChart = (labels, dataChartGender) => {
    const ctx2 = document.getElementById('chartGender').getContext('2d');
    if(window.pie != undefined) 
    window.pie.destroy(); 
    window.pie =  new Chart(ctx2, {
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

const usiaChart = (labels, dataChartUsia) => {
    const ctx3 = document.getElementById('chartUsia').getContext('2d');
    if(window.pie != undefined) 
    window.pie.destroy(); 
    window.pie =  new Chart(ctx3, {
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
            data: dataChartUsia
          }]
        }
      });
}
