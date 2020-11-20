$(document).ready(function(){
    $('#select-provinsi').append(`
        <option value="choose">Choose ... </option>
    `);
    kawalCovid();
});

const kawalCovid = ()=>{
    const urlProxy = "https://cors-anywhere.herokuapp.com/";
    const data = "prov.json";
    $.ajax({
        url: `${urlProxy}https://data.covid19.go.id/public/api/${data}`,
        type: 'get',
        dataType: 'json',
        data: data,
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
const ctx = document.getElementById("myChart").getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 23, 2, 3],
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
            'rgba(255,99,132,1)',
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
                    beginAtZero:true
                }
            }]
        }
    }
});