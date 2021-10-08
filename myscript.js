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
			"<a href='https://github.com/EpicGames/UnrealEngine/blob/release" 
			+ valueCell.firstElementChild.innerHTML 
			+ "' target='_new'>" 
			+ valueCell.firstElementChild.innerHTML 
			+ "</a>";
	}
}	

