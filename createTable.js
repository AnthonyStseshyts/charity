function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function createDomElement(tagName, text) {
  const element = document.createElement(tagName);
  element.textContent = text;
  return element;
}

// CREATE TABLE
function createDefaultTable(rowsNumber, cellsNumber) {
  const table = createDomElement('table');
  for (let i = 0; i <= rowsNumber; i++) {
    const tr = createDomElement('TR');
    table.append(tr);
    for (let j = 0; j <= cellsNumber; j++) {
      let cell;
      if (tr.rowIndex === 0 && j > 0) {
        cell = createDomElement('td', 'X');
        cell.classList.add('deleteColumn');
      } else if (tr.rowIndex === 0) {
        cell = createDomElement('td', '🐷');
      } else if (tr.rowIndex > 0 && j === 0) {
        cell = createDomElement('td', 'X');
        cell.classList.add('deleteRow');
      } else {
        cell = createDomElement('td', generateRandomNumber());
      }

      tr.append(cell);
    }
  }

  paintCells(table);

  return table;
}

const buttonAddRow = createDomElement('button', 'Add Row 😍');
const buttonAddCell = createDomElement('button', 'Add Column 😎');
const defaultTable = createDefaultTable(4, 4);

document.body.append(buttonAddRow);
document.body.append(buttonAddCell);
document.body.append(defaultTable);

// DELETE COLUMN
defaultTable.addEventListener('click', e => {
  if (!e.target.classList.contains('deleteColumn')) return;
  const cellIndexToDelete = e.target.cellIndex;
  for (let i = 0; i < defaultTable.rows.length; i++) {
    defaultTable.rows[i].cells[cellIndexToDelete].remove();
  }

  paintCells(defaultTable);
});

// DELETE ROW
defaultTable.addEventListener('click', e => {
  if (!e.target.classList.contains('deleteRow')) return;
  const tr = e.target.parentElement;
  tr.remove();

  paintCells(defaultTable);
});

// ADD ROW
buttonAddRow.addEventListener('click', e => {
  const cellsNumber = defaultTable.rows[0].cells.length;
  const tr = createDomElement('TR');
  for (let i = 0; i < cellsNumber; i++) {
    if (i === 0) {
      const cell = createDomElement('TD', 'X');
      cell.classList.add('deleteRow');
      tr.append(cell);
    } else {
      const cell = createDomElement('TD', generateRandomNumber());
      tr.append(cell);
    }
  }

  defaultTable.append(tr);
  paintCells(defaultTable);
});

// ADD COLUMN
buttonAddCell.addEventListener('click', e => {
  Array.from(defaultTable.rows).forEach((tr, i) => {
    let cell;
    if (i === 0) {
      cell = createDomElement('TD', 'X');
      cell.classList.add('deleteColumn');
    } else {
      cell = createDomElement('TD', generateRandomNumber());
    }

    tr.append(cell);
  });

  paintCells(defaultTable);
});

// PAINT CELLS
function paintDiagonalCells(table) {
  const rowsNumber = table.rows.length;
  const columnsNumber = table.rows[0].cells.length;

  if (rowsNumber === columnsNumber) {
    for (let i = 1; i < rowsNumber; i++) {
      table.rows[i].cells[i].className = 'active';
    }
  } else {
    Array.from(document.querySelectorAll('.active')).forEach(cell =>
      cell.classList.remove('active')
    );
  }
}

function paintMaxMin(table) {
  let min = +table.rows[1].cells[1].textContent;
  let minCells = [table.rows[1].cells[1]];
  let max = +table.rows[1].cells[1].textContent;
  let maxCells = [table.rows[1].cells[1]];
  // TODO: length -1
  for (let i = 1; i < table.rows.length; i++) {
    for (let j = 1; j < table.rows[i].cells.length; j++) {
      const curCell = table.rows[i].cells[j];

      if (+curCell.textContent < min) {
        min = +curCell.textContent;
        minCells = [curCell];
      } else if (+curCell.textContent === min) {
        minCells.push(curCell);
      } else if (+curCell.textContent > max) {
        max = +curCell.textContent;
        maxCells = [curCell];
      } else if (+curCell.textContent === max) {
        maxCells.push(curCell);
      }
    }
  }

  minCells.forEach(cell => {
    if (!cell.classList.contains('active')) {
      cell.className = 'min';
    }
  });

  maxCells.forEach(cell => {
    if (!cell.classList.contains('active')) {
      cell.className = 'max';
    }
  });
}

function paintCells(table) {
  paintMaxMin(table);
  paintDiagonalCells(table);
}
