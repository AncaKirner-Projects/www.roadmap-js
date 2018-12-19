export const getAllCategories = async () => {
  let categories;
  try {
    const response = await fetch('http://localhost:8000/categories');
    categories = await response.json();
  } catch (err) {
    throw new Error(err);
  }

  return categories;
}