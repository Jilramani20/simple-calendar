
const calendarBody = document.getElementById('calendarBody');
const currentMonthYear = document.getElementById('currentMonthYear');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentDate = new Date();

function renderCalendar() {
    calendarBody.innerHTML = ''; // Clear previous dates
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    currentMonthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) { // Max 6 rows for calendar
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) { // 7 days a week
            const cell = document.createElement('td');
            if (i === 0 && j < firstDayOfMonth) {
                // Empty cells before the first day of the month
                cell.textContent = '';
            } else if (date > daysInMonth) {
                // Empty cells after the last day of the month
                cell.textContent = '';
            } else {
                cell.textContent = date;
                // Highlight today's date
                if (date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    cell.classList.add('today');
                }
                // Add click listener for date selection (optional)
                cell.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-grid td').forEach(td => td.classList.remove('selected'));
                    cell.classList.add('selected');
                });
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
        if (date > daysInMonth) break; // Stop if all dates are rendered
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar(); // Initial render