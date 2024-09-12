import React from 'react';

function CategoryForm({ handleSubmit, value, setValue, buttonName }) {
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-section">
        <input
          type="text"
          id="categoryName"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="custom-form-input"
          placeholder="Category Name"
          required
        />
      </div>
      <div className="form-section">
        <button type="submit" className="form-dashboard-btn">
          {buttonName}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
