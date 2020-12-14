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
                       data.ModalBodyApi.html('');
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

