<?php
header("Content-type: text/html; charset=UTF-8");

// Récupération des données de la requête AJAX du formulaire de 'create.html'

$url = $_POST['bckurl'];
$nom = $_POST['bcknom'];
$pv = $_POST['bckpv'];
$pa = $_POST['bckpa'];

// Vérification de ce que toutes les données ont été transmises

if (!$url || !$nom || !$pv || !$pa) {
    echo "Il manque des éléments dans le formulaire de création du personnage!";
    exit(); // Le programme prend fin
}

// Vérification et nettoyage de $url, qui doit contenir une url valide

$url = filter_var($url, FILTER_SANITIZE_URL);
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    echo "L'url pour la photo du personnage n'est pas valide, 'bécile!";
    exit(); // Le programme prend fin
}

// Vérification de ce que $pv contient bien une valeur numérique dans la bonne tranche

if (!filter_var($pv, FILTER_VALIDATE_INT) || filter_var($pv, FILTER_VALIDATE_INT, 
array("options" => array("min_range" => 1, "max_range" => 100))) === false) {
    echo "Les points de vie doivent être compris entre 1 et 100, pour mémoire!";
    exit(); // Le programme prend fin
}

// Vérification de ce que $pa contient bien une valeur numérique dans la bonne tranche

if (!filter_var($pa, FILTER_VALIDATE_INT) || filter_var($pa, FILTER_VALIDATE_INT, 
array("options" => array("min_range" => 1, "max_range" => 100))) === false) {
    echo "Les points d'attaque doivent être compris entre 1 et 100, pour mémoire!";
    exit(); // Le programme prend fin
}

// Nettoyage des variables contenant du texte libre

$nom = filter_var($nom, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
$nom = filter_var($nom, FILTER_SANITIZE_SPECIAL_CHARS);

// Etablissement d'une connexion à la base de données

$connex = new mysqli("mysql-nectardedemo.alwaysdata.net", "170341_dev2019", "dev2019form", "nectardedemo_versus");
if ($connex->connect_error) {
    die("La connexion à la bdd a échoué : " . $connex->connect_error);
}

// Forçage du charset UTF-8

$connex->set_charset("utf8");
$connex->query("SET NAMES utf8");

// Préparation de la requête SQL

$requete = $connex->prepare("INSERT INTO versus (nom, pv, pa, url) VALUES (?, ?, ?, ?)");

// Renseignement des valeurs dynamiques de la requête

$requete->bind_param("siis", $nom, $pv, $pa, $url);

// Exécution de la requête

$requete->execute();

// Fermeture de la requête et de la connexion

$requete->close();
$connex->close();

echo "Le nouveau personnage a bien été enregistré dans la base de données!";

?>