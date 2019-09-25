let nom_fighter_1 = "Jean";
let pv_fighter_1 = 100;
let pa_fighter_1 = 15;
let url_fighter_1 = "";

let nom_fighter_2 = "Macron";
let pv_fighter_2 = 100;
let pa_fighter_2 = 10;
let url_fighter_2 = "";

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
      if (!loupeMonAttaque() == 1) {
        pv_fighter_2 = pv_fighter_2 - pa_fighter_1 * powerAttack();
        isPerso1 = false;
    }
      
    } else {
      if (!loupeMonAttaque() == 1) {
        pv_fighter_1 = pv_fighter_1 - pa_fighter_2 * powerAttack();
        isPerso1 = true;
      }
    }

    if (pv_fighter_1 <= 0) {
      console.log(nom_fighter_1 + " est mort !");
      clearInterval(idInterval);
    }
    if (pv_fighter_2 <= 0) {
      console.log(nom_fighter_2 + " est mort !");
      clearInterval(idInterval);
    }
  }, 2000);
};
