 $(function(){
    var provinceObject1 =  $("#province_1");
    var amphureObject1 =  $("#amphure_1");
    var districtObject1 =  $("#district_1");

    var provinceObject2 =  $("#province_2");
    var amphureObject2 =  $("#amphure_2");
    var districtObject2 =  $("#district_2");
    
    // on change province
    provinceObject1.on('change', function(){
        var provinceId = $(this).val();
        console.log(provinceId);
        amphureObject1.html('<option value="">เลือกอำเภอ</option>');
        districtObject1.html('<option value="">เลือกตำบล</option>');
        $.get('/api/get_amphure/' + provinceId, function(data){
            var result = data;
            $.each(result, function(index, item){
                amphureObject1.append(
                    $('<option></option>').val(item.id).html(item.name_th)
                );
            });
        });
    });
    provinceObject2.on('change', function(){
        var provinceId = $(this).val();
        console.log(provinceId);
        amphureObject2.html('<option value="">เลือกอำเภอ</option>');
        districtObject2.html('<option value="">เลือกตำบล</option>');
        $.get('/api/get_amphure/' + provinceId, function(data){
            var result = data;
            $.each(result, function(index, item){
                amphureObject2.append(
                    $('<option></option>').val(item.id).html(item.name_th)
                );
            });
        });
    });
    // on change amphure
    amphureObject1.on('change', function(){
        var amphureId = $(this).val();
 
        districtObject1.html('<option value="">เลือกตำบล</option>');
        $.get('/api/get_district/' + amphureId, function(data){
            var result = data;
            $.each(result, function(index, item){
                districtObject1.append(
                    $('<option></option>').val(item.id).html(item.name_th)
                );
            });
        });
    });
    amphureObject2.on('change', function(){
        var amphureId = $(this).val();
 
        districtObject2.html('<option value="">เลือกตำบล</option>');
        $.get('/api/get_district/' + amphureId, function(data){
            var result = data;
            $.each(result, function(index, item){
                districtObject2.append(
                    $('<option></option>').val(item.id).html(item.name_th)
                );
            });
        });
    });
});