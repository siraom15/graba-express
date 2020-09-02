 $(function(){
    var uqid = $('#uqid').val();

    var provinceObject =  $("#province"+uqid);
    var amphureObject =  $("#amphure"+uqid);
    var districtObject =  $("#district"+uqid);
    
    // on change province
    provinceObject.on('change', function(){
        var provinceId = $(this).val();
        console.log(provinceId);
        amphureObject.html('<option value="">เลือกอำเภอ</option>');
        districtObject.html('<option value="">เลือกตำบล</option>');
        $.get('/api/get_amphure/' + provinceId, function(data){
            var result = data;
            $.each(result, function(index, item){
                amphureObject.append(
                    $('<option></option>').val(item.id).html(item.name_th)
                );
            });
        });
    });
 
    // on change amphure
    amphureObject.on('change', function(){
        var amphureId = $(this).val();
 
        districtObject.html('<option value="">เลือกตำบล</option>');
        $.get('/api/get_district/' + amphureId, function(data){
            var result = data;
            $.each(result, function(index, item){
                districtObject.append(
                    $('<option></option>').val(item.id).html(item.name_th)
                );
            });
        });
    });
});