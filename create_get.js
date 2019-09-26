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

    let nom_fighter_1 = null;
    let pv_fighter_1 = null;
    let pa_fighter_1 = null;
    let url_fighter_1 = null;

    let nom_fighter_2 = null;
    let pv_fighter_2 = null;
    let pa_fighter_2 = null;
    let url_fighter_2 = null;

    monsieurpropre(); // Appel de la fonction 'monsieurpropre', pour récupérer les 'fighters' de la bdd

    $(document).on('change', 'select', function() {
        showfightersnames(); // Un changement dans les select des fighters appelle 'showfightersnames'
    });

    $('#validate').click(function() {
        getformentries(); // Un clic sur le bouton 'Valider' appelle la fonction 'getformentries'
        monsieurpropre(); // Le même clic appelle à la suite la fonction 'monsieurpropre'
    });

    $('#fight').click(function() {
        $('.theFight').css('display', 'flex');
        commence();
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
    else {
        alert("Formulaire invalide, wtf, call the police!");
    }
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
            let selectFlag = '';

            $('#one').empty();
            $('#two').empty();

            for (let i = 0; i < fighters.length; i++) {
                fighter = fighters[i];
                getId = fighter['id'];
                getNom = fighter['nom'];
                getPv = fighter['pv'];
                getPa = fighter['pa'];
                getUrl = fighter['url'];
                if (i == 0) {
                    selectFlag = ' selected'
                }
                else {
                    selectFlag = '';
                }
                options += `<option value = "` + i + `"` + selectFlag + `>` + getId + `</option>`;
            }
                $('#one').append(options);
                $('#two').append(options);

                showfightersnames();
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

    let indexFighterOne = $('select#one').val();
    let indexFighterTwo = $('select#two').val();

    fighter = fighters[indexFighterOne];
    getNom = fighter['nom'];
    $('#playerone').text(getNom);
    nom_fighter_1 = getNom;
    pv_fighter_1 = fighter['pv'];
    pa_fighter_1 = fighter['pa'];
    url_fighter_1 = fighter['url'];

    fighter = fighters[indexFighterTwo];
    getNom = fighter['nom'];
    $('#playertwo').text(getNom);
    nom_fighter_2 = getNom;
    pv_fighter_2 = fighter['pv'];
    pa_fighter_2 = fighter['pa'];
    url_fighter_2 = fighter['url'];

    $('#pv_f1').text('PV -> ' + pv_fighter_1);
    $('#pv_f2').text('PV -> ' + pv_fighter_2);

    $('#nom_f1').text(nom_fighter_1);
    $('#nom_f2').text(nom_fighter_2);

    $('.photo_f1').css('background-image', 'url(' + url_fighter_1 + ')');
    $('.photo_f2').css('background-image', 'url(' + url_fighter_2 + ')');

    $('#history').val('');
}

// La fonction 'writeintextarea' permet de mettre à jour l'historique du 'fight'

function writeintextarea(sentence) {
    let $edit = $("#history");
    let curValue = $edit.val();
    let newValue = curValue + sentence + "\n";
    $edit.val(newValue);
}

// Les fonctions qui suivent permettent de lancer la session de 'fight'

function commence() {
  let random = String(Math.round(Math.random()));
  if (random == 0) {
    // Perso qui attaque
    fight(true);
  } else {
    // Perso 2 qui attaque
    fight(false);
  }
}

function powerAttack() {
  let random = Math.floor(Math.random() * 6) + 1;
  return random;
}

function loupeMonAttaque() {
  let rdn_loupe = Math.floor(Math.random() * 3) + 1;
  return rdn_loupe;
}

function fight(isPerso1) {
  let idInterval = setInterval(function() {
    if (isPerso1 == true) {
      if (loupeMonAttaque() != 1) {
        pv_fighter_2 = pv_fighter_2 - pa_fighter_1 * powerAttack();
        console.log(nom_fighter_1 + " Attaque ! " + pv_fighter_2);
        writeintextarea(nom_fighter_1 + " Attaque ! " + pv_fighter_2);
      }
      isPerso1 = false;
    } else {
      if (loupeMonAttaque() != 1) {
        pv_fighter_1 = pv_fighter_1 - pa_fighter_2 * powerAttack();
        console.log(nom_fighter_2 + " Attaque ! " + pv_fighter_1);
        writeintextarea(nom_fighter_2 + " Attaque ! " + pv_fighter_1);
      }
      isPerso1 = true;
    }

    if (pv_fighter_1 <= 0) {
      console.log(nom_fighter_1 + " est mort !");
      writeintextarea(nom_fighter_1 + " est mort !");
      clearInterval(idInterval);
    }
    if (pv_fighter_2 <= 0) {
      console.log(nom_fighter_2 + " est mort !");
      writeintextarea(nom_fighter_2 + " est mort !");
      clearInterval(idInterval);
    }
  }, 2000);
}

});