
//donner à une const un élément du DOM à partir de son id
const mot = document.getElementById('mot');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeLeft = document.getElementById('timeLeft');
const finGame = document.getElementById('finj');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const LevelSel = document.getElementById('niveau');

// Créer un tableau est placé la liste de mots du jeu
const mots = ['terminaison','personnellement','auxiliaires','information','explications','détaillées', 'accessoires','photographier',
  'Malheureusement','révolutionnaire','Révolution','Réseau social','anticonstitutionnellement'];

// initialiser  randomWord
let randomWord;

// initialiser le score
let score = 0;

// initialiser le temps 
let time = 16;

//  choisir la niveau de Difficulté 
let niveau =
// si on a pas un niveau il selictionner niveau moyen par défaut
  localStorage.getItem('niveau') !== null
    ? localStorage.getItem('niveau')
    : 'moyen';

// Définir la valeur de sélection de la niveau sélectionner
LevelSel.value =
  localStorage.getItem('niveau') !== null
    ? localStorage.getItem('niveau')
    : 'moyen';

// faire le cursseur dans le champs input
text.focus();

// Commencer le compte à rebours d'une seconde
const timeInterval = setInterval(updateTime, 1000);

//  la fonction getRandomWord permet de retourner un mot aléatoire à partir de tableau  mots
function getRandomWord() {
  return mots[Math.floor(Math.random() * mots.length)];
}

// La fonction addWordToDOM permet de sélectionner un mot aléatoirement et d'ajouter un mot au DOM
function addWordToDOM() {
  // sélectionner un mot aléatoirement a partir le tableau mots
  randomWord = getRandomWord();
    // Afficher le mot au DOM
  mot.innerHTML = randomWord;
}

//La fonction updateScore permet de mettre à jour le score
function updateScore() {
  //Ajouter un au score
  score++;
  //Afficher le nouveau score
  scoreEl.innerHTML = score;
}

// La fonction updateTime permet de  mettre à jour le temps
function updateTime() {
  //
  time--;
  //afficher le temp en DOM
  timeLeft.innerHTML = time + ' s';

  if (time === 0) {
    //arrêter le compteur 
    clearInterval(timeInterval);
    // fin de jeu
    gameOver();
  }
}

// afficher à l'écran un message de fin du jeu
function gameOver() {
  finGame.innerHTML = ` Votre score final est  ${score}  `;
  finGame.style.display = 'flex';
}
    // ajouter un mot au DOM
addWordToDOM();


text.addEventListener('input', e => {
//kif indakhel 7arf idetakti lektiba
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    // ajouter un mot au DOM
    addWordToDOM();
    // mise à jour le score
    updateScore();
    // re-initialiser le champ input
    e.target.value = '';
// si le niveau est difficile on ajouter 2 secondes , si le niveau moyen on ajouter 5 secondes si non on ajouter 8 secondes
    if (niveau === 'difficile') {
      time += 2;
    } else if (niveau === 'moyen') {
      time += 5;
    } else {
      time += 8;
    }
    // mise à jour le temps
    updateTime();
  }
});

// Settings select
settingsForm.addEventListener('change', e => {
  //détecter la niveau
  niveau = e.target.value;
  // Enregistrer le niveau sur le stockage local
    localStorage.setItem('niveau', niveau);
});
