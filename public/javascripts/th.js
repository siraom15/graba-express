$(function () {
    var provinceObject1 = $("#province_start");
    var amphureObject1 = $("#amphure_start");
    var districtObject1 = $("#district_start");

    var provinceObject2 = $("#province_destination");
    var amphureObject2 = $("#amphure_destination");
    var districtObject2 = $("#district_destination");

    // on change province
    provinceObject1.on('change', function () {
        var provinceId = $(this).val();
        amphureObject1.html('<option value="">กำลังโหลด...</option>');
        $.get('/api/get_amphure/' + provinceId, function (data) {
            amphureObject1.html('<option value="">เลือกอำเภอ</option>');
            var result = data;
            $.each(result, function (index, item) {
                amphureObject1.append(
                    $('<option></option>').val(item.id).html(item.name_th)
                );
            });
        });
    });
    provinceObject2.on('change', function () {
        var provinceId = $(this).val();
        amphureObject2.html('<option value="">กำลังโหลด...</option>');

        $.get('/api/get_amphure/' + provinceId, function (data) {
            amphureObject2.html('<option value="">เลือกอำเภอ</option>');
            var result = data;
            $.each(result, function (index, item) {
                amphureObject2.append(
                    $('<option></option>').val(item.id).html(item.name_th)
                );
            });
        });
    });
    // on change amphure
    amphureObject1.on('change', function () {
        var amphureId = $(this).val();
        districtObject1.html('<option value="">กำลังโหลด...</option>');
        $.get('/api/get_district/' + amphureId, function (data) {
            districtObject1.html('<option value="">เลือกตำบล</option>');
            var result = data;
            $.each(result, function (index, item) {
                districtObject1.append(
                    $('<option></option>').val(item.id).html(item.name_th)
                );
            });
        });
    });
    amphureObject2.on('change', function () {
        var amphureId = $(this).val();

        districtObject2.html('<option value="">กำลังโหลด...</option>');
        $.get('/api/get_district/' + amphureId, function (data) {
            districtObject2.html('<option value="">เลือกตำบล</option>');
            var result = data;
            $.each(result, function (index, item) {
                districtObject2.append(
                    $('<option></option>').val(item.id).html(item.name_th)
                );
            });
        });
    });
});