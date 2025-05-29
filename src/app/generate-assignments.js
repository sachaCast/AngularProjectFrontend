// generate-assignments.js

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// Подключи свой MongoDB URI сюда
mongoose.connect("mongodb+srv://sachacast03:sachacast03@cluster0.ntzhu.mongodb.net/assignmentsDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const subjects = ["math", "physics", "chemistry", "history", "english", "biology", "geography", "computer-science"];

// Схема
const assignmentSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  submitted: Boolean,
  subject: String,
  author: String,
  grade: String,
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

// Генерация
async function generateAssignments() {
  const assignments = [];

  for (let i = 0; i < 1000; i++) {
    const submitted = faker.datatype.boolean();
    const subject = faker.helpers.arrayElement(subjects);
    const grade = submitted ? faker.number.int({ min: 0, max: 20 }).toString() : "";

    const assignment = new Assignment({
      name: faker.lorem.words({ min: 2, max: 5 }),
      dueDate: faker.date.future({ years: 0.3 }),
      submitted,
      subject,
      author: faker.person.fullName(),
      grade,
    });

    assignments.push(assignment);
  }

  await Assignment.insertMany(assignments);
  console.log("✅ 1000 assignments inserted successfully.");
  mongoose.disconnect();
}

generateAssignments().catch(console.error);
