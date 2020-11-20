$(document).ready(function(){
    data.Err.hide();
    data.SelectSurah.append(`
        <option value="choose" selected>Choose...</option>
    `);

    quranApi();

    data.PilihSurah.on('click', () => {
        data.ResultSurah.html('');
        const surahData = {
            'surah': data.SelectSurah.val(),
        };
        
        if(surahData.surah === 'choose' || surahData.surah === ''){   
            data.ResultSurah.html(`
                <tr>
                    <td class="text-danger text-center" style="width:100%;" colspan="7">Maaf anda belum memilih nama surah</td>
                </tr>
            `);
        }else{
            data.TableEmpty.hide('slow').slideUp(1000);
            // alert(data.surah);
            $.ajax({
                url: `${baseAPI.proxy}${baseAPI.quran}${surahData.surah}.json`,
                type: 'get',
                dataType: 'json',
                data: surahData.surah,
                success: function(res){
                   if(res){
                       data.SelectSurah.val('choose');
                       data.ModalBodySurah.html('');
                    //    console.log(res);
                       data.ResultSurah.append(`      
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

const quranApi = () =>{
    const quranData = {
      'jsonData': "quran.json"
    };

    $.ajax({
        url: `${baseAPI.proxy}${baseAPI.quranMaster}${quranData.jsonData}`,
        type: 'get',
        dataType: 'json',
        data: quranData.jsonData,
        success: function(res){
            // alert(res.length);
            console.log(res);   
            for(let i = 0; i<=res.length; i++){
                const number_surah = res[i].number_of_surah;
                const nama_surah = res[i].name;
                data.SelectSurah.append(`
                     <option id="pilih" value="${number_surah}">${nama_surah}</option>
                `);
            }
        }

    })
}



const showRecitations = () => {
    data.ModalSurah.modal('show');
    data.ModalBodySurah.html('');
    const recitation = {
        'surah': $('#recitations').data('surah')
    };

    $.ajax({
        url: `${baseAPI.proxy}${baseAPI.quran}${recitation.surah}.json`,
        type: 'get',
        dataType: 'json',
        data: recitation.surah,
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

                data.ModaLabelSurah.text(`${res.name} Recitations `);
                data.ModalBodySurah.append(`
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


const showVerses = () => {
    data.ModalSurah.modal('show');
    data.ModalBodySurah.html('');
    const verses = {
        'surah': $('#verses').data('surah'),
    };
    
    $.ajax({
        url: `${baseAPI.proxy}${baseAPI.quran}${verses.surah}.json`,
        type: 'get',
        dataType: 'json',
        data: verses.surah,
        success: function(res){
            data.ModaLabelSurah.html(`Surah - ${res.name}`);
            const verses = res.verses;
            for(let i = 0; i <= verses.length; i++){
                const show = (res.verses[i].number === 1) ? 'show' : '';
                data.ModalBodySurah.append(`
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