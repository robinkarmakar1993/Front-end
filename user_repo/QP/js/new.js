function showExercise() {
    document.getElementById('instructions_p').style.display = "none";
    document.getElementById('questions_p').style.display = "block";
    document.getElementById('welcome_p').style.display = "none";
    document.getElementById('demos_p').style.display = "none";
    document.getElementById('capston_p').style.display = "none";
    // document.getElementById('head').innerHTML = "";
    // document.getElementById("head").style.marginLeft = "150px";
    // document.getElementById('head').innerHTML = "Certification";
    // document.getElementById('sub').innerHTML = "";
    // document.getElementById('questions').style.backgroundColor="#0f4a86d3"
    // document.getElementById('welcome').style.backgroundColor=""
    // document.getElementById('instructions').style.backgroundColor=""
}

function showInstructions() {
    document.getElementById('instructions_p').style.display = "block";
    document.getElementById('questions_p').style.display = "none";
    document.getElementById('welcome_p').style.display = "none";
    document.getElementById('demos_p').style.display = "none";
    document.getElementById('capston_p').style.display = "none";
    // document.getElementById('head').innerHTML = "";
    // document.getElementById("head").style.marginLeft = "100px";
    // document.getElementById('head').innerHTML = "Instructions";
    // document.getElementById('sub').innerHTML = "";
    // document.getElementById('questions').style.backgroundColor=""
    // document.getElementById('welcome').style.backgroundColor=""
    // document.getElementById('instructions').style.backgroundColor="#0f4a86d3"
}

function showWelcome() {
    document.getElementById('instructions_p').style.display = "none";
    document.getElementById('questions_p').style.display = "none";
    document.getElementById('welcome_p').style.display = "block";
    document.getElementById('demos_p').style.display = "none";
    document.getElementById('capston_p').style.display = "none";
    // document.getElementById('head').innerHTML = "";
    // document.getElementById('head').innerHTML = "Welcome";
    // document.getElementById('sub').innerHTML = "";
    // document.getElementById("head").style.marginLeft = "0px";
    // document.getElementById('head').innerHTML = "Data Science Lab On Cloud";
    // document.getElementById('questions').style.backgroundColor=""
    // document.getElementById('welcome').style.backgroundColor="#0f4a86d3"
    // document.getElementById('instructions').style.backgroundColor=""
}

function showDemo() {
    document.getElementById('demos_p').style.display = "block";
    document.getElementById('capston_p').style.display = "none";
    document.getElementById('instructions_p').style.display = "none";
    document.getElementById('questions_p').style.display = "none";
    document.getElementById('welcome_p').style.display = "none";
}

function showCapston() {
    document.getElementById('demos_p').style.display = "none";
    document.getElementById('capston_p').style.display = "block";
    document.getElementById('instructions_p').style.display = "none";
    document.getElementById('questions_p').style.display = "none";
    document.getElementById('welcome_p').style.display = "none";
}