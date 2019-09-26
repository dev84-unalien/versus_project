$(document).ready(function() {

    let id = null;
    let nom = null;
    let pv = null;
    let pa = null;
    let url = null;

    let getId = null;
    let getNom = null;
    let getPv = null;
    let getPa = null;
    let getUrl = null;

    let fighters = null;
    let fighter = null;

    monsieurpropre(); // Appel de la fonction 'monsieurpropre', pour récupérer les 'fighters' de la bdd
    showfightersnames(); // Appel de la fonction 'showfightersnames', pour mettre à jour la zone 'x vs y'

    $('#fight').click(function() {
        $("#one option[value='1']").prop('selected', true);
    });

    $('#validate').click(function() {
        getformentries(); // Un clic sur le bouton 'Valider' appelle la fonction 'getformentries'
    });

/* La fonction 'getformentries' récupère les valeurs entrées dans les champs
de données du formulaire html de création de 'fighter', à savoir 'create.html',
et vérifie que ces données ne sont pas nulles. Après quoi, un appel à la fonction
'cifammoniacal' est effectué, avec en paramètres les données du formulaire */

function getformentries() {

    let ausweis = 0;

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
}

/* La fonction 'cifammoniacal' effectue une requête AJAX du type 'POST',
à destination du fichier 'create_perso.php'. Le but est donc d'enregistrer
un 'fighter' dans la base de données */

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

/* La fonction 'monsieurpropre' effectue une requête AJAX du type 'GET',
à destination du fichier 'get_perso.php'. Le but est donc de récupérer
la totalité des 'fighters' de la base de données, par l'intermédiaire d'un
objet JSON, et de peupler un tableau avec ces mêmes données */

function monsieurpropre() {

    $.ajax({
        url: 'http://localhost/get_perso.php',
        type: 'GET',
        success: function success(result) {

            fighters = JSON.parse(JSON.stringify(result));

            let options = '';

            $('#one').empty();
            $('#two').empty();

            for (let i = 0; i < fighters.length; i++) {
                fighter = fighters[i];
                getId = fighter['id'];
                getNom = fighter['nom'];
                getPv = fighter['pv'];
                getPa = fighter['pa'];
                getUrl = fighter['url'];
                options += `<option value = "` + i + `">` + getId + `</option>`;
            }
                $('#one').append(options);
                $('#two').append(options);
        },
        error: function error(fail) {
            alert(fail);
        }
    });
}

/* La fonction 'showfightersnames' récupère les index sélectionnés dans les select 'one'
et 'two' de la page 'create.html', et affiche les noms des 'fighters' correspondants
récupérés dans le tableau 'fighters', ceci dans la zone 'x vs y' prévue à cet effet */

function showfightersnames() {

    // $("#one option[value='0']").prop('selected', true);
    // $("#two option[value='1']").prop('selected', true);

    // $('#one').val(0).change();
    // $('#two').val(1).change();

    // $('#one').prop('selectedIndex', 0);
    // $('#two').prop('selectedIndex', 1);

    let indexFighterOne = $('select#one').val();
    let indexFighterTwo = $('select#two').val();

    alert(indexFighterOne + ' / ' + indexFighterTwo);

    fighter = fighters[indexFighterOne];
    getNom = fighter['nom'];
    $('#playerone').text(getNom);

    fighter = fighters[indexFighterTwo];
    getNom = fighter['nom'];
    $('#playertwo').text(getNom);
}

});