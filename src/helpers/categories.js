export const getAllCategories = async () => {
  console.log('in fetch categ');
  let categories;
  try {
    const response = await fetch('http://localhost:8000/categories');
    categories = await response.json();
  } catch (err) {
    throw new Error(err);
  }

  return categories;
}