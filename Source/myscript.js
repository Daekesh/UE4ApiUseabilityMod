var s = document.createElement( 'script' );
s.src = chrome.runtime.getURL( 'pagescript.js' );
s.onload = function() { this.remove(); };
( document.head || document.documentElement ).appendChild( s );

function updateUrls( baseUrl )
{
	var referencesNode = document.getElementById( "references" );

	if ( referencesNode != null )
	{		
		var referenceRows = referencesNode.getElementsByClassName( "normal-row" );
		
		for ( var i = 0, length = referenceRows.length; i < length; ++i )
		{
			var nameCell = referenceRows[ i ].getElementsByClassName( "name-cell" )[ 0 ];
			
			if ( nameCell == null || 
				 nameCell.firstElementChild == null || ( 
					 nameCell.firstElementChild.innerHTML != "Header" && 
					 nameCell.firstElementChild.innerHTML != "Source" ) )
				continue;
	
			var valueCell = referenceRows[ i ].getElementsByClassName( "desc-cell" )[ 0 ];
			
			if ( valueCell == null || nameCell.firstElementChild == null )
				continue;

			valueCell.firstElementChild.innerHTML = 
				"<a href='"
				+ baseUrl
				+ valueCell.firstElementChild.innerHTML 
				+ "' target='_new'>" 
				+ valueCell.firstElementChild.innerHTML 
				+ "</a>";

			if ( baseUrl.startsWith( 'file://' ) )
				valueCell.firstElementChild.firstElementChild.setAttribute( 'onclick', "UEAUM_copyUrl( this ); return false;" );
		}
	}
}

function addHeaders()
{
	var maincol = document.getElementById('maincol');
	var access = document.getElementById('access');

	if ( maincol && access )
	{
		access.innerHTML = "<a name='top' />" + access.innerHTML;

		var headers = maincol.getElementsByClassName('heading');

		for ( var i = 0, length = headers.length; i < length; ++i)
		{
			var headerName = headers[i].children[0].innerHTML.trim();
			
			access.innerHTML += ( i == 0 ? "<br />" : ", " ) + "<a href='#" + headerName + "' style='color: #ffffff;'>" + headerName + "</a>";

			headers[i].innerHTML = "<a name='" + headerName + "' />" + headers[i].innerHTML;
			
			var content = headers[i].nextElementSibling;
			console.log( content );
			content.innerHTML += "<a href='#top'>Back To Top</a>";
		}
	}
}

chrome.storage.sync.get({
		baseUrl: 'https://github.com/EpicGames/UnrealEngine/blob/release'
	}, function( items ) {
		updateUrls( items.baseUrl );
		addHeaders();
});
