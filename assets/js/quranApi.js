$(document).ready(function(){
    $('#err').hide();
    $('#select-surah').append(`
        <option value="choose" selected>Choose...</option>
    `);
    quranApi();

    $('#pilih-surah').on('click', function(){
        $('#result').html('');
        const data = {
            'surah': $('#select-surah').val()
        };
        const urlProxy = "https://cors-anywhere.herokuapp.com/";
        
        if(data.surah === 'choose' || data.surah === ''){   
            $('#result').html(`
                <tr>
                    <td class="text-danger text-center" style="width:100%;" colspan="7">Maaf anda belum memilih nama surah</td>
                </tr>
            `);
        }else{
            $('.dataTables_empty').hide('slow').slideUp(1000);
            // alert(data.surah);
            $.ajax({
                url: `${urlProxy}https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${data.surah}.json`,
                type: 'get',
                dataType: 'json',
                data: data,
                success: function(res){
                   if(res){
                       $('#select-surah').val('choose');
                       $('.modal-body-surah').html('');
                    //    console.log(res);
                       $('#result').append(`      
                            <tr>
                                <td>${res.name}</td>
                                <td>Number - ${res.number_of_surah}</td>
                                <td>${res.number_of_ayah} - Ayah</td>
                                <td>${res.type}</td>
                                <td>${res.place}</td>
                                <td><button class="btn btn-success btn-sm" id="recitations" data-surah="${res.number_of_surah}" onclick="showRecitations()">View Recitations</button></td>
                                <td><button class="btn btn-primary btn-sm" id="verses" data-surah="${res.number_of_surah}" onclick="showVerses()">View Verses</button></td>
                            </tr>
                       `);

                   }
                }
            });
        }
    });
});

function quranApi(){
    const urlProxy = "https://cors-anywhere.herokuapp.com/";
    const data = "quran.json";
    $.ajax({
        url: `${urlProxy}https://raw.githubusercontent.com/penggguna/QuranJSON/master/${data}`,
        type: 'get',
        dataType: 'json',
        data: data,
        success: function(res){
            // alert(res.length);
            console.log(res);
            for(let i = 0; i<=res.length; i++){
                const number_surah = res[i].number_of_surah;
                const nama_surah = res[i].name;
                $('#select-surah').append(`
                     <option id="pilih" value="${number_surah}">${nama_surah}</option>
                `);
            }
        }

    })
}



function showRecitations(){
    $('#surahModal').modal('show');
    const urlProxy = "https://cors-anywhere.herokuapp.com/";
    const surah = $('#recitations').data('surah');
    $('.modal-body-surah').html('');
    $.ajax({
        url: `${urlProxy}https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${surah}.json`,
        type: 'get',
        dataType: 'json',
        data: surah,
        success: function(res){
            if(res){
                const bacaan = {
                    'name': 
                    {
                        'satu': `${res.recitations[0].name}`,
                        'dua' : `${res.recitations[1].name}`,
                        'tiga': `${res.recitations[2].name}`
                    }, 
                    'audio':
                    {
                        'satu': `${res.recitations[0].audio_url}`,
                        'dua': `${res.recitations[1].audio_url}`,
                        'tiga': `${res.recitations[2].audio_url}`
                    }
                };

                $('#ModalLabelSurah').text(`${res.name} Recitations `);
                $('.modal-body-surah').append(`
                     <ul>    
                         <li>
                             ${bacaan.name.satu} <br/>
                             <audio controls>
                                 <source src="${bacaan.audio.satu}" type="audio/mpeg">
                                 <small class="text-danger">
                                     Your browser does not support the audio element.
                                 </small>
                             </audio>
                         </li>
                         <li>
                             ${bacaan.name.dua}<br/>
                             <audio controls>
                                 <source src="${bacaan.audio.dua}" type="audio/mpeg">
                                 <small class="text-danger">
                                     Your browser does not support the audio element.
                                 </small>
                             </audio>
                         </li>
                         <li>
                             ${bacaan.name.tiga}<br/>
                             <audio controls>
                                 <source src="${bacaan.audio.tiga}" type="audio/mpeg">
                                 <small class="text-danger">
                                     Your browser does not support the audio element.
                                 </small>
                             </audio>
                         </li>
                     </ul>
                `);

            }
        }
    });
}


function showVerses(){
    $('#surahModal').modal('show');
    const urlProxy = "https://cors-anywhere.herokuapp.com/";
    const surah = $('#verses').data('surah');
    $('.modal-body-surah').html('');
    $.ajax({
        url: `${urlProxy}https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${surah}.json`,
        type: 'get',
        dataType: 'json',
        data: surah,
        success: function(res){
            $('#ModalLabelSurah').html(`Surah - ${res.name}`);
            const verses = res.verses;
            for(let i = 0; i <= verses.length; i++){
                const show = (res.verses[i].number === 1) ? 'show' : '';
                $('.modal-body-surah').append(`
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="card-header" id="heading${i}">
                            <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapseOne">
                                    Ayat ${verses[i].number}
                                </button>
                            </h2>
                        </div>

                        <div id="collapse${i}" class="collapse ${show}" aria-labelledby="heading${i}" data-parent="#accordionExample">
                        <div class="card-body">
                            <h5>${verses[i].number} . <span style="font-size: 31px; font-weight:bold;">${verses[i].text}</span></h5>
                            <p>
                                Id = ${verses[i].translation_id}<br/><br/>
                                En = ${verses[i].translation_en}<br/>
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>
                `);
            }
        }
    });

}