
const ToDo = ((title, dueDate = new Date('sep-08-20'), description = 'Add some more text', priority = 'Low') => ({
  title, description, dueDate, priority,
}));
export default ToDo;
