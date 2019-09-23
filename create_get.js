$(document).ready(function() {

    let id = null;
    let url = '';
    let nom = '';
    let pv = 0;
    let pa = 0;
    let ausweis = null;
    
        $('#validate').click(function() {

            ausweis = 0;
            url = $('#photo').val();
            nom = $('#name').val();
            pv = $('#pv').val();
            pa = $('#pa').val();

            if (url == '') {$('#photo').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#photo').removeClass('badentry');}
            
            if (nom == '') {$('#name').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#name').removeClass('badentry');}
            
            if (pv == '') {$('#pv').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#pv').removeClass('badentry');}

            if (pa == '') {$('#pa').addClass('badentry'); ausweis = 0;}
                else {ausweis++; $('#pa').removeClass('badentry');}

            if (ausweis == 4) {
                cifammoniacal(url, nom, pv, pa);
            }
                else {alert("Formulaire invalide, wtf, call the police!");}
        });

        function cifammoniacal(cifurl, cifnom, cifpv, cifpa) {

            $.ajax({
                url: "http://localhost/create_perso.php",
                type: 'POST',
                data: {bckurl: cifurl, bcknom: cifnom, bckpv: cifpv, bckpa: cifpa},
                success: myHandler,
                error: function () {
                    alert("Something's rotten in the Kingdom... Impossible de créer le personnage...");
                }
            });

            function myHandler (result) {
                alert(result);
            }
        }
});