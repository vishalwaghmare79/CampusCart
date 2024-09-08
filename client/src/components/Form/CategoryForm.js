import React from 'react';

function CategoryForm({ handleSubmit, value, setValue }) {
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-input-wrapper">
        <input
          type="text"
          id="categoryName"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="form-text-input"
          placeholder="Category Name"
          required
        />
      </div>
      <button type="submit" className="form-submit-button">
        Submit
      </button>
    </form>
  );
}

export default CategoryForm;
