// to do list
/* Adım 1: Kullanıcıdan yapılacak işin adını ve tarihini alın.

Adım 2: İş ve tarih bilgisini localStorage'a kaydedin.

Adım 3: Sayfa yenilendiğinde, tüm işleri ve tarihlerini listeleyin. */

//main menu

function isAccepted(msg, ...keys){
    const value = prompt(msg);
    if (keys.includes(value)) {
        return value;
    }else {
        alert("Hatalı tuşlama yaptınız.");
        return isAccepted(msg, ...keys);
    }
}

function mainMenu(){
    const value = isAccepted(`1- İşleri Listele \n 2- İş Ekle \n 3-Çıkış`, "1", "2", "3");

    if (value == 1) {
        return listTasks();
    }else if(value == 2){
        return addTask();
    }else if(value == 3){
        return;
    }else{
        alert("Eksik veya hatalı tuşlama yaptınız.");
        return mainMenu();
    }
}

function nextAction(){
    const value = isAccepted("Başka bir işlem yapmak ister misiniz (e/h)","e","h","E","H");
    if (value.toLowerCase() === "e") {
        return mainMenu();
    }else{
        alert("Güle güle...");
        return;
    }
}

let tasks= [];
if (localStorage.tasks) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}
function addTask(){
    const taskName = prompt("Yapılacak işin adını giriniz: ");
    const taskDate = prompt("Yapılacak işin tarihi giriniz(DD-MM-YYYY): "); 
    if (taskName && taskDate) {
        tasks.push(
            {
                taskName,
                taskDate
            }
        );
        localStorage.setItem("tasks",JSON.stringify(tasks));
        alert("İş başarıyla eklendi.");
    }else{
        alert("Boş bırakılamaz!");
        return addTask();
    }
    return nextAction();
}
function getTasks(){
    return tasks;
}
function listTasks(){
    const tasks = getTasks();
    if (tasks.length === 0) {
        alert("Kayıtlı bir iş bulunmamaktadır.");
    }else{
        // tasks.forEach((task, index) => alert(`Kayıtlı işler: ${index + 1}. ${task.taskName} - ${task.taskDate}`) );
        const taskList = tasks.map((task, index) => `Kayıtlı işler: ${index + 1}, ${task.taskName} - ${task.taskDate}`).join("\n");
        alert(taskList);
    }
    return nextAction();
}
mainMenu();