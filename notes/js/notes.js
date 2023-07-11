(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.notes = {
    attach: function (context, settings) {

      const notesform = document.querySelectorAll("form#notes-form");
      $(notesform).once('notesform').each(function () {
        Drupal.behaviors.notes.notesFormBuild.bind(this)(this, settings);
      });
    },
    notesFormBuild: function (notesform, settings) {
      if (notesform) {
        var savetimer;
        var button = document.createElement("div");
        button.innerHTML = "+";
        button.classList.add("buttonadd");
        notesform.appendChild(button);

        getNotes();

        button.addEventListener("click", function () {
          const allInputs = notesform.querySelectorAll(".allbut .input");
          const lastIndex = allInputs.length > 0 ? parseInt(allInputs[allInputs.length - 1].parentNode.querySelector('.number').textContent) : 0;
          const block = getBlockWithInputAndBtns("", lastIndex);
          notesform.appendChild(block);
          block.querySelector('.input').focus();

        });


      }

      function getBlockWithInputAndBtns(value, index) {
        var allbut = document.createElement("div");
        allbut.classList.add("allbut");

        var number = document.createElement("span");
        number.classList.add("number");
        number.textContent = index + 1;
        allbut.appendChild(number);

        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Введите текст";
        input.value = value;
        input.classList.add("input");
        allbut.appendChild(input);

        var butdelete = document.createElement("button");
        butdelete.innerHTML = "✕";
        butdelete.classList.add("butdelete");
        allbut.appendChild(butdelete);

        butdelete.addEventListener("click", function () {

          notesform.removeChild(allbut);
          const num = document.querySelectorAll('.allbut');
          for (var i =0; i < num.length; i++){
            const inp = num[i];
            const numb = inp.querySelector('.number') ;
            if(numb){
              numb.textContent = i+1;
            }
          }
        });

        input.addEventListener("keydown", function () {
          clearTimeout(savetimer);
          savetimer = setTimeout(sendData, 1000);

        });
        butdelete.addEventListener("click", function () {
          clearTimeout(savetimer);
          savetimer = setTimeout(sendData, 500);

        });
        return allbut;
      }

      function sendData() {
        const data = getData();
        console.log(data);
        $.ajax({
          url: "/save_notes_data",
          data: {data: data},
          dataType: "json",
          type: 'POST',
          success: function (msg) {
            console.log(msg);
          },
          error: function () {
            console.log('updateContent error');

          },
          beforeSend: function () {

          },
          complete: function () {

          }
        });
      }

      function getData() {
        const allinputs = notesform.querySelectorAll(".allbut input");

        var data = [];
        if (allinputs.length > 0) {
          for (let i = 0; i < allinputs.length; i++) {
            const inp = allinputs[i];
            if (inp.value !== "") {
              data.push(inp.value);
            }

          }
        }
        return data;

      }

      function getNotes() {
        $.ajax({
          url: "/get_notes_data",
          dataType: "json",
          type: 'GET',
          success: function (msg) {
            if (msg.length == 0) {
              notesform.appendChild(getBlockWithInputAndBtns("", 0));
            } else {
              for (var i = 0; i < msg.length; i++) {
                var value = msg[i];
                notesform.appendChild(getBlockWithInputAndBtns(value, i));
              }
            }
          },
          error: function () {
            console.log('updateContent error');

          },
          beforeSend: function () {

          },
          complete: function () {

          }
        });
      }

    }
  };
})(jQuery, Drupal, drupalSettings);
