
const ToDo = ((title, dueDate = new Date(), description = 'Add some more text', priority = 'Low') => ({
  title, description, dueDate, priority,
}));
export default ToDo;
