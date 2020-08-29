let i = 0;
let speed = 60;
let txt = "หางาน ง่ายนิดเดียว";
function typeWriter() {
    if (i < txt.length) {
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
typeWriter()
