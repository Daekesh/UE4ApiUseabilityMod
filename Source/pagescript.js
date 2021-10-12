function UEAUM_askToOpenTab()
{
    if ( confirm( "Cannot open the url directly for browser security reasons.\n\nThe local URL has been copied to the clipboard.\n\n Open new tab?" ) )
    {
        window.open();
    }    
}

function UEAUM_copyUrlFallback( elem ) 
{
    var textArea = document.createElement( "textarea" );
    textArea.value = elem.getAttribute( 'href' );
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild( textArea );
    textArea.focus();
    textArea.select();

    try 
    {
        var successful = document.execCommand( 'copy' );
        
        if ( successful )
            UEAUM_askToOpenTab();

        else
            throw( "Failed to run document.execCommand( 'copy' );" );
    } 
    catch ( err ) 
    {
        console.error( 'Failed copy url to clipboard.', err );
    }

    document.body.removeChild( textArea );
}

function UEAUM_copyUrl( elem )
{
    if ( !navigator.clipboard )
    {
        UEAUM_copyUrlFallback( elem );
        return;
    }

    navigator.clipboard.writeText( elem.getAttribute( 'href' ) ).then(
        function() {
            UEAUM_askToOpenTab();
        }
    );
}
