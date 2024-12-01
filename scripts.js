let students = [];
let courses = [];
let studentIndex = 0;

// Grades
const getGrade10 = (score) => {
    if (score >= 90) return 'A';
    else if (score >= 80) return 'B';
    else if (score >= 70) return 'C';
    else if (score >= 60) return 'D';
    else return 'F';
}

const getGrade7 = (score) => {
    if (score >= 93) return 'A';
    else if (score >= 85) return 'B';
    else if (score >= 77) return 'C';
    else if (score >= 70) return 'D';
    else return 'F';
}

// Add Student Modal Activation
document.getElementById('add-student-btn').addEventListener('click', () => {
    document.getElementById('add-student-modal').style.display = 'block';
    document.getElementById('add-score-btn').innerText = "Add" // We change the text here because to update the score, we use the same modal
});

// Add Course Modal Activation
document.getElementById('add-course-btn').addEventListener('click', () => {
    document.getElementById('add-course-modal').style.display = 'block';
});
// Modal Close Button Click
const closeModal = () => {
    document.getElementById('add-student-modal').style.display = 'none';
    document.getElementById('add-course-modal').style.display = 'none';
}

// Add Course Function
document.getElementById('add-select-course-btn').addEventListener('click', () => {
    const courseName = document.getElementById('course-name').value;
    if (!courseName) {
        alert('Please fill in the course name');
        return;
    }
    courses.push({ name: courseName });
    document.getElementById('course-name').value = '';
    closeModal();
    updateCourseSelect(courseName);
});

// Add Course To Select
const updateCourseSelect = (courseName) => {
    const courseSelect = document.getElementById('course');
    const option = document.createElement('option');
    option.value = courseName;
    option.text = courseName;
    courseSelect.appendChild(option);
}

// Add Student Function
document.getElementById('add-score-btn').addEventListener('click', () => {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const course = document.getElementById('course').value;
    const midtermScore = document.getElementById('midterm-score').value;
    const finalScore = document.getElementById('final-score').value;
    const update = document.getElementById('update').value;

    if (midtermScore < 0 || midtermScore > 100) {
        alert("Midterm Score must be between 0 and 100");
        return;
    }
    if (finalScore < 0 || finalScore > 100) {
        alert('Final Score must be between 0 and 100');
        return;
    }
    if (!id || !name || !surname || !course || !midtermScore || !finalScore) {
        alert('Please fill all fields');
        return;
    }
    let student = {
        id: id,
        name: name,
        surname: surname,
        course: course,
        midtermScore: midtermScore,
        finalScore: finalScore
    };
    // Add the student to the list of students
    students.push(student);

    // Clear the input fields and close the modal
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('midterm-score').value = '';
    document.getElementById('final-score').value = '';
    document.getElementById('update').value = '';
    closeModal();
    // Update the html table
    if (update == '1') {// If update's input value is 1 then update the table if it is not then add a new one
        updateStudentTable(student);
    } else addStudentToTable(student);

});


// Update Student Table
const addStudentToTable = (student) => {
    const row = document.getElementById('student-table-body').insertRow();
    // Insert student 
    row.insertCell().innerHTML = student.id;
    row.insertCell().innerHTML = student.name;
    row.insertCell().innerHTML = student.surname;
    row.insertCell().innerHTML = student.course;
    row.insertCell().innerHTML = student.midtermScore;
    row.insertCell().innerHTML = student.finalScore;
    
    // Grades
    row.insertCell().innerHTML = getGrade10((student.midtermGrade * 0.4) + (student.finalScore * 0.6));
    row.insertCell().innerHTML = getGrade7((student.midtermGrade * 0.4) + (student.finalScore * 0.6));
    
    // Update Button
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.className = 'btn';
    updateButton.style.backgroundColor = 'green';
    updateButton.onclick = () => updateStudent(student);
    row.insertCell().appendChild(updateButton);

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn';
    deleteButton.style.backgroundColor = 'red';
    deleteButton.onclick = () => deleteStudent(student);
    row.insertCell().appendChild(deleteButton);

}

// Add Student Modal Modified To Update Table
const updateStudent = (student) => {
    document.getElementById('add-student-modal').style.display = 'block';
    document.getElementById('update').value = '1';
    document.getElementById('id').value = student.id;
    document.getElementById('name').value = student.name;
    document.getElementById('surname').value = student.surname;
    document.getElementById('course').value = student.course;
    document.getElementById('midterm-score').value = student.midtermScore;
    document.getElementById('final-score').value = student.finalScore;
    document.getElementById('add-score-btn').innerText = "Update"
    studentIndex = students.indexOf(student);
}

// Update student table
const updateStudentTable = (student) => {
    students[studentIndex] = student;
    const rows = document.getElementById('student-table-body').rows;
    if (rows[studentIndex].cells[0].innerHTML === student.id) {
        rows[studentIndex].cells[1].innerHTML = student.name;
        rows[studentIndex].cells[2].innerHTML = student.surname;
        rows[studentIndex].cells[3].innerHTML = student.course;
        rows[studentIndex].cells[4].innerHTML = student.midtermScore;
        rows[studentIndex].cells[5].innerHTML = student.finalScore;
        rows[studentIndex].cells[6].innerHTML = getGrade10((student.midtermScore * 0.4) + (student.finalScore * 0.6));
        rows[studentIndex].cells[7].innerHTML = getGrade7((student.midtermScore * 0.4) + (student.finalScore * 0.6));

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.className = 'btn';
        updateButton.style.backgroundColor = 'green';
        updateButton.onclick = () => updateStudent(student);
        rows[studentIndex].cells[8].innerHTML = '';
        rows[studentIndex].cells[8].appendChild(updateButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn';
        deleteButton.style.backgroundColor = 'red';
        deleteButton.onclick = () => deleteStudent(student);
        rows[studentIndex].cells[9].innerHTML = '';
        rows[studentIndex].cells[9].appendChild(deleteButton);
    }
}

const deleteStudent = (student) => {
    const index = students.indexOf(student);
    if (index > -1) { // Delete student from list
        students.splice(index, 1);
    }
    const table = document.getElementById('student-table-body');
    table.deleteRow(index); // Delete row from table
}