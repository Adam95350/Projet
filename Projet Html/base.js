function AfficherMasquer(id)
{
	divInfo = document.getElementById(id);
 
	if (divInfo.style.display == 'none'){
		divInfo.style.display = 'block';
	}
	else{
		divInfo.style.display = 'none';
 	}
}

