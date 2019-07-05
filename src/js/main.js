$(document).ready(function () {
   $('.header-slider').slick({
      draggable: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false
  });

   $('.popup-with-form').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',

      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
         beforeOpen: function () {
            if ($(window).width() < 700) {
               this.st.focus = false;
            } else {
               this.st.focus = '#name';
            }
         }
      }
   });
});


function Calendar2(id, year, month) {
   var Dlast = new Date(year, month + 1, 0).getDate(), // Получаем 0-й день следующего месяца от выбранного (=последний день выбранного месяца)
      D = new Date(year, month, Dlast), // Получаем полную дату последнего дня выбранного месяца
      DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(), // Какой по счёту день недели последний день месяца
      DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(), // Какой по счёту день недели первый день месяца
      calendar = '<tr>',
      month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
      
   // Заполняем пустыми ячейками календарь с понедельника до 1 числа месяца
   if (DNfirst != 0) {
      for (var i = 1; i < DNfirst; i++) calendar += '<td>';
   } else {
      for (var i = 0; i < 6; i++) calendar += '<td>';
   }

   // Расставляем цифры в календарь. Сегодняшняму дню присваиваем класс today
   for (var i = 1; i <= Dlast; i++) {
      if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
         calendar += '<td class="day today selected">' + i;
      } else {
         calendar += '<td class="day">' + i;
      }
      if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
         calendar += '<tr>';
      }
   } 

   //  Заполняем пустыми ячейками календарь от последнего дня месяца до конца недели
   for (var i = DNlast; i < 7; i++) calendar += '<td>';

   // Заполняем тело календаря подготовленными ячейками
   document.querySelector('#' + id + ' tbody').innerHTML = calendar;


   document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
   document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
   document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();

   // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
   if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) { 
      document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td><td><td><td><td><td><td>';
   }

   let days = document.querySelectorAll('.day');
   for (let i = 0; i < days.length; i++) {
      todayChecker(days[i]);
   }
}


function todayChecker(day) {
   day.addEventListener('click', function () {
      let selected = document.querySelector('.selected');
      if (selected != null) {
         console.log(selected);
         
         selected.classList.remove('selected')
      }
      this.classList.add('selected')
   })
}
Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());

// переключатель минус месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
   Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) - 1);
}

// переключатель плюс месяц
document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
   Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) + 1);
}