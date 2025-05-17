// life-calendar.js

const calendarContainer = document.getElementById("calendarContainer");
const shapeSelect = document.getElementById("shapeSelect");

const startAge = 0;
const maxAge = 86;
const weeksPerYear = 52;

const partnerA = { birthYear: 1989 };
const partnerB = { birthYear: 2002 }; // младший партнер
const currentYear = new Date().getFullYear();

function generateCalendar() {
  calendarContainer.innerHTML = "";
  const shape = shapeSelect.value;
  calendarContainer.className = `${shape}`;

  for (let age = startAge; age <= maxAge; age++) {
    const year = partnerA.birthYear + age;

    const row = document.createElement("div");
    row.className = "flex items-center mb-1";

    const label = document.createElement("div");
    label.className = "text-sm w-20 text-right pr-2 text-gray-600";
    label.textContent = `${age} (${year})`;
    row.appendChild(label);

    for (let week = 0; week < weeksPerYear; week++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      const bAge = year - partnerB.birthYear;
      const aAge = age;

      if (aAge > bAge) cell.classList.add("older-partner");

      row.appendChild(cell);
    }

    calendarContainer.appendChild(row);
  }
}

function downloadAs(type) {
  const name = document.getElementById("name").value;
  const motto = document.getElementById("motto").value;

  html2canvas(calendarContainer).then((canvas) => {
    if (type === "png") {
      const link = document.createElement("a");
      link.download = `${name || "calendar"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } else if (type === "pdf") {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.text(name, 10, 5);
      pdf.text(motto, 10, pdf.internal.pageSize.getHeight() - 5);
      pdf.save(`${name || "calendar"}.pdf`);
    }
  });
}

shapeSelect.addEventListener("change", generateCalendar);
window.onload = generateCalendar;
