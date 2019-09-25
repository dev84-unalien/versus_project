<?php

    header("Access-Control-Allow-Origin: *"); // Contournement de l'erreur CORS

    header("Content-Type: application/json; charset=UTF-8");

    $dbh = new mysqli("mysql-nectardedemo.alwaysdata.net", "170341_dev2019", "dev2019form", "nectardedemo_versus");
    
    if ($dbh->connect_errno) {
        echo "Errno: " . $dbh->connect_error . "\n";
        exit;
    }

    $stmt = $dbh->prepare("SELECT id, nom, pv, pa, url FROM versus");
    $stmt->execute();
   
    $bdd_id = null;
    $bdd_nom = null;
    $bdd_pv = null;
    $bdd_pa = null;
    $bdd_url = null;
    
    $stmt->bind_result($bdd_id, $bdd_nom, $bdd_pv, $bdd_pa, $bdd_url);
    
    $fighters = [];
   
    while($row = $stmt->fetch()) {
        $fighters[] = [
            'id' => $bdd_id,
            'nom' => $bdd_nom,
            'pv' => $bdd_pv,
            'pa' => $bdd_pa,
            'url' => $bdd_url
        ];
    }
    
    $stmt->close(); // Fermeture de la requête SQL
    $dbh->close(); // Fermeture de la connexion à la bdd
  
    echo json_encode($fighters); // Publication du JSON

?>