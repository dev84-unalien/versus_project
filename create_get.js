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

        function monsieurpropre() {

            $.ajax({
                url: 'http://localhost/get_perso.php',
                type: 'GET',
                success: function success(result) {

                    let fighters = JSON.parse(JSON.stringify(result));
                    let bubCount = 0;
                    let lastBubPos = 0;

                    $('#dial').empty();

                    for (let i = 0; i < fighters.length; i++) {
                        let fighter = fighters[i];
                        userName = message['pseudo'];
                        userMessage = message['message'];
                        let r = Math.floor(Math.random() * 127);
                        let g = Math.floor(Math.random() * 127);
                        let b = Math.floor(Math.random() * 127);
                        if (r == g == b) {
                            r += mouseX % 31;
                            g += mouseY % 63;
                            b += (mouseX + mouseY) % b;
                        }
                        let userRGB = '#' + r.toString(16) + g.toString(16) + b.toString(16);
                        let userPersoColor = '';
                        if (usersColors[userName] !== undefined) {
                            userPersoColor = usersColors[userName];
                        } else {
                            usersColors[userName] = userRGB;
                            userPersoColor = userRGB;
                        }
                        $('#dial').append(`
                        <div id = 'bub` + i + `' class = 'bubble' style = 'border-color: ` + userPersoColor + `;'>
                        <span class = 'userId' style = 'color: ` + userPersoColor + `; text-shadow: 3px 3px 8px ` 
                        + userPersoColor + `;'>` + userName + `</span>
                        <p class = 'content'>` + userMessage + `</p>
                        </div>`);
                        bubCount = i;
                    }
                    bubCount = '#bub' + bubCount.toString();
                    lastBubPos = $(bubCount).offset().top;
                    $('#dial').scrollTop(lastBubPos);
                },
                error: function error(fail) {
                    alert(fail);
                }
            });
        }
});