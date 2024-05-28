


$(document).ready(function() {
    $('#list').on('click', function(e){
        if(e.target.attributes['data-value']?.value){
            console.log(e.target.attributes['data-value']?.value);
            cancle(e.target.attributes['data-value']?.value)
        }
       
    })
});
function cancle(type){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id,{action: 'cancle', data: type}, function(response){
            console.log(response);
        })
    })
}