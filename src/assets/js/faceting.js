function getParameterByName(name, url) {
  if (!url) {
  url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function onFacetChangeApplied(){
	var url = window.location.href.split("?")[0];
	var search_query = getParameterByName('q');
	var url_with_search_query = url + '?q=' + search_query
	$('input:checkbox.facet').each(function () {
  	   var sThisVal = (this.checked ? $(this).val() : null);
       var sThisName = (this.checked ? $(this).attr('name') : null);
       if(sThisVal !== null){
  	     url_with_search_query += '&selected_facets='+encodeURIComponent(sThisName)+'_exact:'+encodeURIComponent(sThisVal);
       }
    });
	location.href = url_with_search_query;
	return true;
} 

function gotoPage(page){
	var url = window.location.href.split("?")[0];
	var search_query = getParameterByName('q');
	var url_with_search_query = url + '?q=' + search_query
	$('input:checkbox.facet').each(function () {
  	   var sThisVal = (this.checked ? $(this).val() : null);
       var sThisName = (this.checked ? $(this).attr('name') : null);
       if(sThisVal !== null){
  	     url_with_search_query += '&selected_facets='+encodeURIComponent(sThisName)+'_exact:'+encodeURIComponent(sThisVal);
       }
    });
    if (url_with_search_query.includes("?")) {
      url_with_search_query = url_with_search_query+"&page="+page;
	} else {
      url_with_search_query = url_with_search_query+"?page="+page;		
	}
	location.href = url_with_search_query;
	return true;
}

function resetSearch(){
	var url = window.location.href.split("?")[0];
	location.href = url + "?q=";
	return true;

}	


function getQueryParams(){
  var vars = {}, hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
  hash = hashes[i].split('=');
  vars[hash[1]] = hash[0] ;
  }
  return vars;
}

function convertSymbols(result){
  result = result.replace(/\{W\}/g,'<i class="ms ms-w ms-cost"></i>');
  result = result.replace(/\{U\}/g,'<i class="ms ms-u ms-cost"></i>');
  result = result.replace(/\{B\}/g,'<i class="ms ms-b ms-cost"></i>');
  result = result.replace(/\{G\}/g,'<i class="ms ms-g ms-cost"></i>');
  result = result.replace(/\{R\}/g,'<i class="ms ms-r ms-cost"></i>');
  result = result.replace(/\{W\/U\}/g,'<i class="ms ms-wu ms-split ms-cost"></i>');
  result = result.replace(/\{W\/B\}/g,'<i class="ms ms-wb ms-split ms-cost"></i>');
  result = result.replace(/\{2\/W\}/g,'<i class="ms ms-2w ms-split ms-cost"></i>');
  result = result.replace(/\{U\/B\}/g,'<i class="ms ms-ub ms-split ms-cost"></i>');
  result = result.replace(/\{U\/R\}/g,'<i class="ms ms-ur ms-split ms-cost"></i>');
  result = result.replace(/\{2\/U\}/g,'<i class="ms ms-2u ms-split ms-cost"></i>');
  result = result.replace(/\{B\/R\}/g,'<i class="ms ms-br ms-split ms-cost"></i>');
  result = result.replace(/\{B\/G\}/g,'<i class="ms ms-bg ms-split ms-cost"></i>');
  result = result.replace(/\{2\/B\}/g,'<i class="ms ms-2b ms-split ms-cost"></i>');
  result = result.replace(/\{R\/G\}/g,'<i class="ms ms-rg ms-split ms-cost"></i>');
  result = result.replace(/\{R\/W\}/g,'<i class="ms ms-rw ms-split ms-cost"></i>');
  result = result.replace(/\{2\/R\}/g,'<i class="ms ms-2r ms-split ms-cost"></i>');
  result = result.replace(/\{G\/W\}/g,'<i class="ms ms-gw ms-split ms-cost"></i>');
  result = result.replace(/\{G\/U\}/g,'<i class="ms ms-gu ms-split ms-cost"></i>');
  result = result.replace(/\{2\/G\}/g,'<i class="ms ms-2g ms-split ms-cost"></i>');
  result = result.replace(/\{C\}/g,'<i class="ms ms-c ms-cost"></i>');
  result = result.replace(/\{P\}/g,'<i class="ms ms-p ms-cost"></i>');
  result = result.replace(/\{S\}/g,'<i class="ms ms-s ms-cost"></i>');
  result = result.replace(/\{X\}/g,'<i class="ms ms-x ms-cost"></i>');
  result = result.replace(/\{Y\}/g,'<i class="ms ms-y ms-cost"></i>');
  result = result.replace(/\{Z\}/g,'<i class="ms ms-z ms-cost"></i>');
  result = result.replace(/\{0\}/g,'<i class="ms ms-0 ms-cost"></i>');
  result = result.replace(/\{1\}/g,'<i class="ms ms-1 ms-cost"></i>');
  result = result.replace(/\{2\}/g,'<i class="ms ms-2 ms-cost"></i>');
  result = result.replace(/\{3\}/g,'<i class="ms ms-3 ms-cost"></i>');
  result = result.replace(/\{4\}/g,'<i class="ms ms-4 ms-cost"></i>');
  result = result.replace(/\{5\}/g,'<i class="ms ms-5 ms-cost"></i>');
  result = result.replace(/\{6\}/g,'<i class="ms ms-6 ms-cost"></i>');
  result = result.replace(/\{7\}/g,'<i class="ms ms-7 ms-cost"></i>');
  result = result.replace(/\{8\}/g,'<i class="ms ms-8 ms-cost"></i>');
  result = result.replace(/\{9\}/g,'<i class="ms ms-9 ms-cost"></i>');
  result = result.replace(/\{10\}/g,'<i class="ms ms-10 ms-cost"></i>');
  result = result.replace(/\{11\}/g,'<i class="ms ms-11 ms-cost"></i>');
  result = result.replace(/\{12\}/g,'<i class="ms ms-12 ms-cost"></i>');
  result = result.replace(/\{13\}/g,'<i class="ms ms-13 ms-cost"></i>');
  result = result.replace(/\{14\}/g,'<i class="ms ms-14 ms-cost"></i>');
  result = result.replace(/\{15\}/g,'<i class="ms ms-15 ms-cost"></i>');
  result = result.replace(/\{16\}/g,'<i class="ms ms-16 ms-cost"></i>');
  result = result.replace(/\{17\}/g,'<i class="ms ms-17 ms-cost"></i>');
  result = result.replace(/\{18\}/g,'<i class="ms ms-18 ms-cost"></i>');
  result = result.replace(/\{19\}/g,'<i class="ms ms-19 ms-cost"></i>');
  result = result.replace(/\{20\}/g,'<i class="ms ms-20 ms-cost"></i>');
  result = result.replace(/\{100\}/g,'<i class="ms ms-100 ms-cost"></i>');
  result = result.replace(/\{1000000\}/g,'<i class="ms ms-1000000 ms-cost"></i>');
  result = result.replace(/\{T\}/g,'<i class="ms ms-tap"></i>');
  result = result.replace(/\{Q\}/g,'<i class="ms ms-untap"></i>');
  result = result.replace(/\+(\d+)\:/g,'<i class="ms ms-loyalty-up  ms-loyalty-$1"></i>:');
  result = result.replace(/\-(\d+)\:/g,'<i class="ms ms-loyalty-down  ms-loyalty-$1"></i>:');
  result = result.replace(/0:/g,'<i class="ms ms-loyalty-zero ms-loyalty-0"></i>:');
  return result;
}

function showCard(card_url){
    $.ajax({url: card_url, success: function(result){
        $("div#card-detail.card-detail").html(convertSymbols(result));
		$("div#card-detail.card-detail").show();
    }});
}

$( document ).ready(function() {
	var all_params = getQueryParams();
	console.log();
	$.each( all_params, function( key, value ) {
		id = decodeURIComponent(key).replace(/\s/g,'').replace(/[^_]*_exact:/g,'');
		if (value=='selected_facets') $('#'+id).attr('checked', 'checked');
		});
	$( "#card-detail.card-detail" ).click(function() {
        $( "div#card-detail.card-detail" ).toggle();
    });	
	$( "div#card-detail.card-detail" ).hide();
	$('#left-menu').sidr({
      name: 'sidr-left',
      source: '#sidr-left',
      displace: false,
      renaming: false,
      side: 'left'
    });
    $('#right-menu').sidr({
      name: 'sidr-right',
      source: '#sidr-right',
      displace: false,
      renaming: false,
      side: 'right'
    });
});