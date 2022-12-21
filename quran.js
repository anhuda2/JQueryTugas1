$(document).ready(() => {
  // Membuat elemen DOM
  $('head').append('<link rel="stylesheet" type="text/css" href="style.css">');
  const $showData = $("#show-data");
  const $showAyah = $("#show-ayah");
  const $table = $("<table></table>", {
    class: "table table-striped table-bordered",
  });
  const $thead = $("<thead></thead>");
  const $tbody = $("<tbody></tbody>");
  const $tfoot = $("<tfoot></tfoot>");

  // Menyiapkan baris judul tabel
  const $tr1 = $("<tr></tr>");
  $tr1
    .append(
      $("<th></th>", {
        scope: "col",
        text: "No.",
      })
    )
    .append(
      $("<th></th>", {
        scope: "col",
        text: "Nama Surat:",
      })
    )
    .append(
      $("<th></th>", {
        scope: "col",
        text: "Jumlah Ayat:",
      })
    );
  $thead.append($tr1);

  // Memasang elemen DOM
  $table.append($thead).append($tbody).append($tfoot);
  $showData.append($table);

  // Memanggil data dari API
  $.getJSON("https://api.alquran.cloud/v1/surah", (respon) => {
    // Menyiapkan baris data tabel
    const data = respon.data.map((item) => {
      const $tr = $("<tr></tr>");
      $tr
        .append(
          $("<td></td>", {
            class: "surat",
            "data-nomer": item.number,
            text: item.number + ".",
          })
        )
        .append(
          $("<td></td>", {
            class: "surat",
            "data-nomer": item.number,
            text: item.englishName,
          })
        )
        .append(
          $("<td></td>", {
            class: "surat",
            "data-nomer": item.number,
            text: item.numberOfAyahs,
          })
        );
      return $tr;
    });
    // Menambahkan baris data ke dalam tabel
    $tbody.append(data);

    // Menambahkan event listener pada elemen dengan kelas 'surat'
    $(".surat").on("click", function (event) {
      const id = $(event.target).data("nomer");
      $.getJSON(
        `https://api.alquran.cloud/v1/surah/${id}?offset=0`,
        (respon2) => {
          // Menyiapkan baris data untuk tabel di kolom kedua
          const data2 = respon2.data.ayahs.map((item) => {
            const $tr2 = $("<tr></tr>");
            $tr2.append(
              $("<td></td>", {
                html: `<li>${item.text}</li>`,
              })
            );
            return $tr2;
          });
          // Menambahkan baris data ke dalam tabel di kolom kedua
          $showAyah.html("").append(
            $("<table></table>", {
              class: "table table-striped table-bordered",
            }).append($("<tbody></tbody>").append(data2))
          );
        }
      );
    });
  });
});
