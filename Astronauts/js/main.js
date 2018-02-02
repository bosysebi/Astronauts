
var a = document.getElementById('astronauts').addEventListener('submit', saveAstronaut);

function saveAstronaut(e){
  var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  var dob = document.getElementById('dob').value;
  var power = document.getElementById('power').value;

  if(!name || !surname || !dob || !power){
    alert('This astronaut is missing something!');
    return;
  }

  var astronaut = {
    name: name,
    surname: surname,
    dob: dob,
    power: power
  }

  if(localStorage.getItem('astro')===null){
    var astro = [];
    astro.push(astronaut);
    localStorage.setItem('astro', JSON.stringify(astro));
  } else {
     var astro = JSON.parse(localStorage.getItem('astro'));
     astro.push(astronaut);
     localStorage.setItem('astro', JSON.stringify(astro));
  }

  document.getElementById('astronauts').reset();

  addAstronaut();

  e.preventDefault();
}

/*more of a display astronauts function*/
function addAstronaut(){
  var astroList = JSON.parse(localStorage.getItem('astro'));
  var table = document.getElementById('takeMe');
  table.innerHTML ='';
  if(astroList === null){
    return;
  }
  for(var i=0; i<astroList.length; i++){
    var name = astroList[i].name;
    var surname = astroList[i].surname;
    var dob = astroList[i].dob;
    var power = astroList[i].power;
    table.innerHTML += '<tr>'+
                        '<td>'+name+'</td>'+
                        '<td>'+surname+'</td>'+
                        '<td>'+dob+'</td>'+
                        '<td>'+power+'</td>'+
                        '<td><button class="btn-primary" id="deleter" onclick="deleteAstronaut(this)">delete</button>'+
                      '</tr>'

  }
}

/*sort the table by the attribute clicked on*/
function sortTable(num){
  var astro = JSON.parse(localStorage.getItem('astro'));
  if(num === 0){
    for(var i=0; i<astro.length; i++){
      var index = i;
      var name = astro[i].name.toLowerCase();
      for(var j=i+1; j<astro.length; j++){
        if(astro[j].name.toLowerCase()<name){
          index = j;
          name = astro[j].name.toLowerCase();
        }
      }
      var temp = astro[i];
      astro[i] = astro[index];
      astro[index] = temp;
    }
  }
  else if(num === 1){
    for(var i=0; i<astro.length; i++){
      var index = i;
      var name = astro[i].surname.toLowerCase();
      for(var j=i+1; j<astro.length; j++){
        if(astro[j].surname.toLowerCase()<name){
          index = j;
          name = astro[j].surname.toLowerCase();
        }
      }
      var temp = astro[i];
      astro[i] = astro[index];
      astro[index] = temp;
    }
  }

  else if(num===2){
    for(var i=0; i<astro.length; i++){
      var dob = astro[i].dob.split('-');
      var index = i;
      for(var j=i+1; j<astro.length; j++){
        var bod = astro[j].dob.split('-');
        if(bod[0]<dob[0]){
          index = j;
          dob = bod;
        } else if(bod[0]==dob[0] && bod[1]<dob[1]){
          index = j;
          dob = bod;
        } else if(bod[0]==dob[0] && bod[1]==dob[1] && bod[2]<dob[2]){
          index = j;
          dob = bod;
        }
      }
      var temp = astro[i];
      astro[i] = astro[index];
      astro[index] = temp;
    }
  }

  else if(num === 3){
    for(var i=0; i<astro.length; i++){
      var index = i;
      var name = astro[i].power.toLowerCase();
      for(var j=i+1; j<astro.length; j++){
        if(astro[j].power.toLowerCase()<name){
          index = j;
          name = astro[j].power.toLowerCase();
        }
      }
      var temp = astro[i];
      astro[i] = astro[index];
      astro[index] = temp;
    }
  }
  console.log(astro);
  localStorage.setItem('astro', JSON.stringify(astro));
  addAstronaut();
}

/*searches the table using their first name and surname*/
function searchTable(name){
  var input = document.getElementById('search').value.toLowerCase();
  var table = document.getElementById('takeMe');
  var tr = table.getElementsByTagName('tr');
  for(var i = 0; i<tr.length; i++){
    var name = tr[i].getElementsByTagName('td')[0];
    var surname = tr[i].getElementsByTagName('td')[1];
    if (name.innerHTML.toLowerCase().indexOf(input) > -1|| surname.innerHTML.toLowerCase().indexOf(input) > -1){
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

/*deletes the astronaut in the row where the delete button was clicked*/
function deleteAstronaut(r){
  var index = r.parentNode.parentNode.rowIndex-1;
  var astro = JSON.parse(localStorage.getItem('astro'));
  var name = astro[index].name;
  var surname = astro[index].surname;
  if(confirm('Do you want to delete '+name+' '+surname+' from the record?')){
    astro.splice(index, 1);
  }
  localStorage.setItem('astro', JSON.stringify(astro));
  addAstronaut();
}
