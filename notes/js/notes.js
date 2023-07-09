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
        var $progress_element = $(Drupal.theme('ajaxProgressIndicatorFullscreen'));
        var button = document.createElement("div");
        button.innerHTML = "+";
        button.classList.add("buttonadd");
        notesform.appendChild(button);

        getNotes();

        button.addEventListener("click", function () {
          const block = getBlockWithInputAndBtns("");
          notesform.appendChild(block);
          block.querySelector('.input').focus();

        });


      }

      function getBlockWithInputAndBtns(value) {
        var allbut = document.createElement("div");
        allbut.classList.add("allbut");

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

        var butsave = document.createElement("button");
        butsave.classList.add("butsave");
        // allbut.appendChild(butsave);
        butdelete.addEventListener("click", function () {

          notesform.removeChild(allbut);

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
            $progress_element.remove();
          },
          beforeSend: function () {
            $('body').after($progress_element);
          },
          complete: function () {
            $progress_element.remove();
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
              notesform.appendChild(getBlockWithInputAndBtns(""));
            }
            else {

              for (var i = 0; i < msg.length; i++) {
                var value = msg[i];
                notesform.appendChild(getBlockWithInputAndBtns(value));
              }
            }
          },
          error: function () {
            console.log('updateContent error');
            $progress_element.remove();
          },
          beforeSend: function () {
            $('body').after($progress_element);
          },
          complete: function () {
            $progress_element.remove();
          }
        });
      }

    }
  };
})(jQuery, Drupal, drupalSettings);
