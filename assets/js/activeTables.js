$(document).ready( function () {
    $('#myTable').DataTable({
        responsive: true
    });
    $('.dataTables_length').hide();
    $('.dataTables_filter').hide();
    // $('.dataTables_empty').hide();
    $('.dataTables_info').hide();
    $('.dataTables_paginate').hide();
    $('.dataTables_empty').html(`<h5 class="text-danger">Silahkan pilih nama surah </h5>`)
} );