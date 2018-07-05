// "I pledge my honor that I have abided by the Stevens Honor System" - Matthew Brand

const school1 = {
  schoolName: "Some Preschool Which I Don't Remember The Name Of",
  degree: "PreSchool Degree?",
  favoriteClass: "The entire school was one class",
  favoriteMemory: "Don't remember much from that time"
};

const school2 = {
  schoolName: "Willow Road Elementary School",
  degree: "Elementary School Degree?",
  favoriteClass: "4th Grade with Mr. C",
  favoriteMemory:
    "When Luke threw glue sticks at everyone and had to be carried out of the classroom by our gym teacher, Mr. Gatto"
};

const school3 = {
  schoolName: "Valley Stream North High School",
  degree: "Advanced Regents Diploma",
  favoriteClass: "AP US Government",
  favoriteMemory: "Secretly watching Jackass 2 during Spanish class"
};

const school4 = {
  schoolName: "Stephens Institute of Technology",
  degree: "Bachelors in Computer Science",
  favoriteClass: "CS 546 WS",
  favoriteMemory: "Working on Lab 6 for CS 546 WS"
};

const educationInfo = [];

educationInfo.push(school1);
educationInfo.push(school2);
educationInfo.push(school3);
educationInfo.push(school4);

const exportedMethods = {
  getEducation() {
    return educationInfo;
  }
};

module.exports = exportedMethods;
