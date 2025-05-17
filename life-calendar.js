// life-calendar.js

const calendarContainer = document.getElementById("calendarContainer");
const birthAInput = document.getElementById("birthA");
const birthBInput = document.getElementById("birthB");
const modeSelect = document.getElementById("modeSelect");

const startAge = 0;
const maxAge = 86;
const weeksPerYear = 52;
const today = new Date();

function generateCalendar() {
  calendarContainer.innerHTML = "";

  const birthA = new Date(birthAInput.value);
  const isCouple = modeSelect.value === "couple";
  const birthB = isCouple ? new Date(birthBInput.value) : null;

  for (let age = startAge; age <= maxAge; age++) {
    const rowYear = birthA.getFullYear() + age;
    const row = document.createElement("div");
    row.className = "flex items-center mb-[2px]";

    const label = document.createElement("div");
    label.className = "text-xs w-20 text-right pr-2 text-gray-500 shrink-0";
    label.textContent = `${age} (${rowYear})`;
    row.appendChild(label);

    const weekWrap = document.createElement("div");
    weekWrap.className = "flex flex-wrap";

    for (let week = 0; week < weeksPerYear; week++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", selectedShape);

      const weekDate = new Date(rowYear, 0, 1 + week * 7);

      if (weekDate <= today && weekDate >= birthA) {
        cell.classList.add("filled");
      }

      if (isCouple && birthB && weekDate < birthB && weekDate >= birthA) {
        cell.classList.add("older-partner", "filled");
      }

      weekWrap.appendChild(cell);
    }

    row.appendChild(weekWrap);
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

["change", "input"].forEach(evt => {
  birthAInput.addEventListener(evt, generateCalendar);
  birthBInput.addEventListener(evt, generateCalendar);
  modeSelect.addEventListener(evt, generateCalendar);
});

window.onload = generateCalendar;
